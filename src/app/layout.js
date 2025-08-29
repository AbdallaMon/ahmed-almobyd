import "./globals.css";
import ToastProvider from "@/app/providers/ToastLoadingProvider";
import AuthProvider from "@/app/providers/AuthProvider";
import MUIContextProvider from "@/app/providers/MUIContext";
import DotsLoader from "@/app/UiComponents/feedback/loaders/DotsLoading";
import MuiAlertProvider from "@/app/providers/MuiAlert.jsx";
import colors from "@/app/helpers/colors.js";
import { Noto_Kufi_Arabic } from "next/font/google";
import UploadingProvider from "./providers/UploadingProgressProvider";

const noto = Noto_Kufi_Arabic({
  weight: ["400", "500", "700"],
  style: ["normal"],
  subsets: ["arabic"],
  display: "swap",
});
export const metadata = {
  title: "المهندس أحمد المبيض | حجز استشارة تصميم داخلي",
  description: `احجز استشارتك الآن مع المهندس أحمد المبيض، المتخصص في التصميم الداخلي الفاخر. اكتشف كيف يمكنه تحويل مساحتك إلى مكان يجمع بين الأناقة، الراحة، والوظيفية. استشارات مخصصة للمجالس، المداخل، غرف المعيشة، والفلل الفاخرة.`,
  keywords: `المهندس أحمد المبيض, أحمد المبيض, استشارة تصميم داخلي, حجز استشارة, تصميم فلل, تصميم مجالس, مهندس ديكور, تصميم داخلي, ديكورات فاخرة, استشارات هندسية, تصميم إماراتي, Luxury Interior Design, Villa Design UAE`,

  openGraph: {
    title: "احجز استشارتك مع المهندس أحمد المبيض",
    description:
      "استفد من خبرة المهندس أحمد المبيض في التصميم الداخلي الفاخر. احجز موعدك الآن لتحصل على رؤية تصميمية مخصصة لمساحتك السكنية أو التجارية مع لمسات من الفخامة العصرية.",
    image: "https://eng.ahmadmobayed.com/about/personal.jpeg",
    url: "https://ahmadmobayed.com/register",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "احجز استشارتك مع المهندس أحمد المبيض",
    description:
      "Transforming visions into luxurious, elegant, and functional living spaces.",
    images: ["https://eng.ahmadmobayed.com/about/personal.jpeg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={noto.className}
        style={{ backgroundColor: colors.bgSecondary }}
      >
        <MuiAlertProvider>
          <MUIContextProvider>
            <UploadingProvider>
              <ToastProvider>
                <AuthProvider>
                  <DotsLoader />
                  {children}
                </AuthProvider>
              </ToastProvider>
            </UploadingProvider>
          </MUIContextProvider>
        </MuiAlertProvider>
      </body>
    </html>
  );
}
