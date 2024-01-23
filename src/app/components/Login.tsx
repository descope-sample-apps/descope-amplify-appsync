import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const DescopeWC = dynamic(
  async () => {
    const { Descope } = await import("@descope/react-sdk");
    return (props: React.ComponentProps<typeof Descope>) => (
      <Descope {...props} />
    );
  },
  {
    ssr: false,
  }
);

export default function Login() {
  const router = useRouter();
  const onSuccess = useCallback(() => {
    router.push("/");
  }, [router]);

  const onError = useCallback(
    (e: any) => {
      console.log("Descope got error", e);
      router.push("/");
    },
    [router]
  );

  const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'white'
  };

  return (
    <div style={centerStyle}>
      <DescopeWC
        flowId={process.env.NEXT_PUBLIC_DESCOPE_FLOW_ID || "test"}
        onSuccess={onSuccess}
        onError={onError}
      />
    </div>
  );
}