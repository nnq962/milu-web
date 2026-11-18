import type { Metadata } from "next";

/**
 * What the page says about Milu, in one place. The numbers follow the iOS app
 * (AIQuota.swift, Milu.storekit, LegalDocument.swift): when they change there, change them here.
 */
export const site = {
  name: "Milu",
  /** Where the site lives: link previews and canonical addresses are built on it. */
  url: "https://milu.nnqlab.dev",
  tagline: "Bạn cứ vi vu, chi thu có Milu.",
  description:
    "Milu là app quản lý tài chính cá nhân cho iPhone: ghi thu chi một chạm hoặc bằng giọng nói, hũ tiết kiệm, vay nợ, báo cáo và trợ lý AI hiểu tiếng Việt.",

  /**
   * The app's page on the App Store. While it is `null` every download button says
   * "Sắp có trên App Store"; put the link here on launch day and they all become real.
   */
  appStoreUrl: null as string | null,

  supportEmail: "support@milu.nnqlab.dev",
  /** IPHONEOS_DEPLOYMENT_TARGET of the app. */
  minIOS: "17",

  /** Milu AI's turns (AIQuota.swift). */
  ai: { weeklyFree: 10, weeklyPro: 150, stepBonus: 5, bonusDays: 7 },

  /** Milu Pro's prices in đồng (Milu.storekit). */
  pro: { monthly: 49_000, yearly: 399_000 },
} as const;

/**
 * What a shared link says about the site (Open Graph), the same on every page; a page adds its own
 * title, description and address. The picture is public/og-image.png for all of them
 * (scripts/make-og-image.sh draws it).
 */
export const openGraph: NonNullable<Metadata["openGraph"]> = {
  type: "website",
  locale: "vi_VN",
  siteName: site.name,
  images: [
    {
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Milu: Bạn cứ vi vu, chi thu có Milu. App quản lý tài chính cá nhân cho iPhone.",
    },
  ],
};

export const nav = [
  { href: "/#tinh-nang", label: "Tính năng" },
  { href: "/#milu", label: "Gặp Milu" },
  { href: "/#rieng-tu", label: "Riêng tư" },
  { href: "/#pro", label: "Milu Pro" },
  { href: "/#hoi-dap", label: "Hỏi đáp" },
] as const;

/** Câu hỏi thường gặp: the app's FAQView, and one more from its terms (what Milu is not). */
export const faq = [
  {
    question: "Dữ liệu của tôi lưu ở đâu?",
    answer:
      "Trên iPhone của bạn, và trong iCloud của bạn khi iPhone đăng nhập iCloud: xoá app rồi cài lại, hay đổi máy cùng Apple ID, dữ liệu tự về. Milu không có máy chủ lưu dữ liệu và không xem được iCloud của bạn.",
  },
  {
    question: "Hạn mức chi tiêu tính thế nào?",
    answer:
      "Cộng mọi khoản chi trong tháng, cả phí chuyển khoản và lãi vay; không tính các khoản bạn đánh dấu không tính vào báo cáo và các tài khoản đang khoá. Đặt ở Cài đặt → Hạn mức chi tiêu.",
  },
  {
    question: "Lượt AI là gì?",
    answer: `Mỗi câu hỏi gửi Milu AI dùng một lượt; nhờ Milu ghi hay xoá giao dịch, hay hỏi về chính Milu (lượt AI, Milu Pro, quyền riêng tư), thì không tốn lượt, và câu Milu không trả lời được (mất mạng, bấm dừng) được trả lại lượt. Mỗi tuần có ${site.ai.weeklyFree} lượt miễn phí, làm mới lúc 0 giờ thứ Hai. Mỗi bước Làm quen với Milu bạn làm xong được thêm ${site.ai.stepBonus} lượt thưởng, dùng trong ${site.ai.bonusDays} ngày.`,
  },
  {
    question: "Chuyển tiền giữa các tài khoản có tính là chi không?",
    answer: "Không. Chỉ phí chuyển khoản (nếu có) được tính là chi.",
  },
  {
    question: "Milu có kết nối với ngân hàng của tôi không?",
    answer:
      "Không. Milu là app để bạn tự ghi chép và theo dõi thu chi: không giữ tiền, không chuyển tiền, không kết nối với tài khoản ngân hàng của bạn.",
  },
] as const;

/** Milu's 20 faces, by the names the design gave them. */
export const faces = [
  { file: "nguyen-ban", name: "Nguyên bản" },
  { file: "than-thien", name: "Thân thiện" },
  { file: "to-mo", name: "Tò mò" },
  { file: "vui", name: "Vui" },
  { file: "boi-roi", name: "Bối rối" },
  { file: "nhay-mat", name: "Nháy mắt" },
  { file: "cuoi-banh-noc", name: "Cười banh nóc" },
  { file: "me-man", name: "Mê mẩn" },
  { file: "nguong-ngung", name: "Ngượng ngùng" },
  { file: "buon-thiu", name: "Buồn thiu" },
  { file: "tui-than", name: "Tủi thân" },
  { file: "khoc-oa", name: "Khóc òa" },
  { file: "gian-doi", name: "Giận dỗi" },
  { file: "hot-hoang", name: "Hốt hoảng" },
  { file: "buon-ngu", name: "Buồn ngủ" },
  { file: "ngu-kho", name: "Ngủ khò" },
  { file: "sut-sit", name: "Sụt sịt" },
  { file: "dung-hinh", name: "Đứng hình" },
  { file: "ngao-ngo", name: "Ngáo ngơ" },
  { file: "chong-mat", name: "Chóng mặt" },
] as const;

/** Money as Milu writes it: "10.000.000đ", with "−" (U+2212) for money out. */
export function vnd(amount: number, options: { sign?: boolean } = {}): string {
  const digits = String(Math.abs(Math.round(amount))).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const sign = amount < 0 ? "−" : options.sign && amount > 0 ? "+" : "";
  return `${sign}${digits}đ`;
}
