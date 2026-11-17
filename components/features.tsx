import { AssistantDemo } from "@/components/demos/assistant-demo";
import { JarsDemo } from "@/components/demos/jars-demo";
import { RecordDemo } from "@/components/demos/record-demo";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/motion";
import { SectionHead } from "@/components/stage";
import type { HugeiconName } from "@/lib/hugeicons";
import { site } from "@/lib/site";
import { cn } from "@/lib/u";

type Point = { icon: HugeiconName; title: string; text: string };

/** The three things Milu does every day, each on the sky of its tab in the app. */
export function Features() {
  return (
    <section id="tinh-nang" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHead label="Làm quen với Milu" title="Ba việc Milu làm giúp bạn mỗi ngày">
            Ghi lại, hỏi han, để dành. Phần cộng trừ và nhớ giùm, Milu lo.
          </SectionHead>
        </Reveal>

        <div className="mt-20 space-y-28 sm:mt-24 sm:space-y-36">
          <Row
            label="Milu ghi chép"
            title={
              <>
                Ghi một chạm,
                <br />
                rõ từng đồng.
              </>
            }
            text="Chọn hạng mục, nhập số tiền, xong. Số dư từng ví, tổng chi trong ngày và báo cáo tháng tự cập nhật theo."
            points={[
              { icon: "search-01", title: "Tìm lại trong vài giây", text: "Tìm và lọc giao dịch thu, chi theo điều bạn nhớ." },
              { icon: "calendar-03", title: "Lịch thu chi", text: "Nhìn cả tháng trên một tờ lịch, ngày nào tiêu bao nhiêu." },
              { icon: "clock-01", title: "Khoản định kỳ tự ghi", text: "Tiền nhà, tiền mạng, lương: tới ngày là có trong sổ." },
            ]}
            demo={<RecordDemo />}
          />

          <Row
            flip
            label="Milu AI"
            title={
              <>
                Cứ nói,
                <br />
                Milu lo phần còn lại.
              </>
            }
            text="Ghi chi tiêu hay hỏi số liệu bằng lời. Milu soạn sẵn thẻ giao dịch, bạn xem lại rồi bấm Lưu."
            points={[
              { icon: "mic-01", title: "Nói như ngoài đời", text: "“35k”, “1tr2”, “1 củ rưỡi”: Milu hiểu cách người Việt nói tiền." },
              { icon: "bubble-chat", title: "Hỏi là có số", text: "“Tháng này mình chi bao nhiêu?”, “Mình còn nợ ai?”" },
              {
                icon: "sparkles",
                title: `Miễn phí ${site.ai.weeklyFree} lượt hỏi mỗi tuần`,
                text: "Nhờ Milu ghi hay xoá giao dịch thì không tốn lượt.",
              },
            ]}
            demo={<AssistantDemo />}
          />

          <Row
            label="Milu giữ ví"
            title={
              <>
                Mỗi mục tiêu một hũ,
                <br />
                nhìn là biết còn bao xa.
              </>
            }
            text="Tiền mặt, ngân hàng, ví điện tử gom về một sổ. Góp vào hũ thuỷ tinh, nước dâng lên theo từng lần góp."
            points={[
              { icon: "wallet-01", title: "Mọi ví một chỗ", text: "Tiền mặt, tài khoản ngân hàng, ví điện tử, thẻ tín dụng." },
              { icon: "chart-increase", title: "Tài sản ròng", text: "Có bao nhiêu, nợ bao nhiêu, còn lại bao nhiêu." },
              { icon: "money-saving-jar", title: "Hũ đầy là thấy ngay", text: "Đạt mục tiêu, nước lên tới cổ lọ và con số chuyển xanh." },
            ]}
            demo={<JarsDemo />}
          />
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  title,
  text,
  points,
  demo,
  flip = false,
}: {
  label: string;
  title: React.ReactNode;
  text: string;
  points: Point[];
  demo: React.ReactNode;
  flip?: boolean;
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <Reveal className={cn(flip && "lg:order-2")}>
        <p className="inline-flex items-center gap-1.5 text-[12px] font-extrabold tracking-[0.14em] text-ink-2 uppercase">
          <Icon name="paw-print" size={15} />
          {label}
        </p>
        <h3 className="mt-4 text-[clamp(1.9rem,4vw,2.9rem)] leading-[1.14] font-black tracking-[-0.02em]">{title}</h3>
        <p className="mt-5 max-w-[30rem] text-[18px] leading-[1.65] text-ink-2">{text}</p>

        <ul className="mt-8 space-y-5">
          {points.map((point) => (
            <li key={point.title} className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-mist text-glyph">
                <Icon name={point.icon} size={22} />
              </span>
              <div>
                <p className="text-[17px] font-extrabold">{point.title}</p>
                <p className="mt-0.5 text-[15px] leading-[1.55] text-ink-2">{point.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal y={48} scale={0.96} className={cn(flip && "lg:order-1")}>
        {demo}
      </Reveal>
    </div>
  );
}
