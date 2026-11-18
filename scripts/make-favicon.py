"""Packs PNGs of the app icon into app/favicon.ico, for the tools that still ask for that file.

    python3 scripts/make-favicon.py <folder with 16.png, 32.png, 48.png> <favicon.ico>

scripts/sync-assets.sh calls it. An .ico's PNGs must have an alpha channel (Next.js refuses the file
otherwise), and the app icon has none, so each PNG is rewritten as RGBA first. Standard library only.
"""

import pathlib
import struct
import sys
import zlib

SIGNATURE = b"\x89PNG\r\n\x1a\n"
SIZES = (16, 32, 48)


def chunk(kind: bytes, body: bytes) -> bytes:
    return struct.pack(">I", len(body)) + kind + body + struct.pack(">I", zlib.crc32(kind + body))


def rgba_png(data: bytes) -> bytes:
    """An 8-bit RGB PNG, not interlaced, as an 8-bit RGBA one, every pixel opaque."""
    if data[:8] != SIGNATURE:
        raise ValueError("not a PNG")
    position, packed, header = 8, b"", None
    while position < len(data):
        length, kind = struct.unpack(">I4s", data[position : position + 8])
        body = data[position + 8 : position + 8 + length]
        if kind == b"IHDR":
            header = struct.unpack(">IIBBBBB", body)
        elif kind == b"IDAT":
            packed += body
        position += 12 + length
    if header is None:
        raise ValueError("PNG without a header")
    width, height, depth, colour, _, _, interlace = header
    if colour == 6 and depth == 8:
        return data
    if (depth, colour, interlace) != (8, 2, 0):
        raise ValueError(f"expected an 8-bit RGB PNG, got depth {depth}, colour type {colour}")

    # Undo each row's filter (PNG specification, "Filtering"), then add the alpha byte.
    raw = zlib.decompress(packed)
    stride = width * 3
    previous = bytearray(stride)
    pixels = bytearray()
    for row in range(height):
        start = row * (stride + 1)
        kind = raw[start]
        line = bytearray(raw[start + 1 : start + 1 + stride])
        for x in range(stride):
            left = line[x - 3] if x >= 3 else 0
            up = previous[x]
            corner = previous[x - 3] if x >= 3 else 0
            if kind == 1:
                line[x] = (line[x] + left) & 255
            elif kind == 2:
                line[x] = (line[x] + up) & 255
            elif kind == 3:
                line[x] = (line[x] + ((left + up) >> 1)) & 255
            elif kind == 4:
                guess = left + up - corner
                near_left, near_up, near_corner = abs(guess - left), abs(guess - up), abs(guess - corner)
                if near_left <= near_up and near_left <= near_corner:
                    line[x] = (line[x] + left) & 255
                elif near_up <= near_corner:
                    line[x] = (line[x] + up) & 255
                else:
                    line[x] = (line[x] + corner) & 255
        pixels.append(0)
        for x in range(0, stride, 3):
            pixels += line[x : x + 3] + b"\xff"
        previous = line

    return (
        SIGNATURE
        + chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0))
        + chunk(b"IDAT", zlib.compress(bytes(pixels), 9))
        + chunk(b"IEND", b"")
    )


def main() -> None:
    parts, out = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
    images = [(size, rgba_png((parts / f"{size}.png").read_bytes())) for size in SIZES]
    offset = 6 + 16 * len(images)
    entries = b""
    for size, data in images:
        entries += struct.pack("<BBBBHHII", size, size, 0, 0, 1, 32, len(data), offset)
        offset += len(data)
    out.write_bytes(struct.pack("<HHH", 0, 1, len(images)) + entries + b"".join(data for _, data in images))


if __name__ == "__main__":
    main()
