import "./globals.css";
import ToastProvider from "@/app/v2/providers/ToastLoadingProvider";
import AuthProvider from "@/app/v2/providers/AuthProvider";
import MUIContextProvider from "@/app/v2/providers/MUIContext";
import DotsLoader from "@/app/v2/shared/components/DotsLoader";
import MuiAlertProvider from "@/app/v2/providers/MuiAlert";
import UploadingProvider from "@/app/v2/providers/UploadingProgressProvider";
import LanguageProvider from "./v2/providers/LanguageProvider";

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

      <LanguageProvider>
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
      </LanguageProvider>
    </html>
  );
}
