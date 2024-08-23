import * as RadixToast from "@radix-ui/react-toast";
import cx from "classnames";
import { FC, ReactNode, createContext, useCallback, useContext, useState } from "react";

const genRandomId = () => Math.random().toString(32).substring(2);

type ToastItem = {
  id: string;
  type: "success" | "error";
  title: ReactNode;
  description?: ReactNode;
  duration?: number;
  isOpen: boolean;
  dataTestId?: string;
};

type OpenToastParams = Omit<ToastItem, "id" | "isOpen">;

const OpenToastContext = createContext<(params: OpenToastParams) => void>(() => null);

export function useToast() {
  return useContext(OpenToastContext);
}

const Toast: FC<{
  value: ToastItem;
  onClose: (id: string) => void;
}> = ({ value, onClose }) => {
  const textClassname = cx({
    "text-red-500": value.type === "error",
    "text-teal-500": value.type === "success",
  });

  const bgClassname = cx({
    "bg-red-50": value.type === "error",
    "bg-teal-50": value.type === "success",
  });

  return (
    <RadixToast.Root
      className={`flex items-center gap-2 rounded-md bg-white p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out] ${textClassname} ${bgClassname}`}
      open={value.isOpen}
      onOpenChange={(isOpen) => !isOpen && onClose(value.id)}
      duration={value.duration}
      data-testid={value.dataTestId}
    >
      <div className='flex-1'>
        <RadixToast.Title className='font-bold'>{value.title}</RadixToast.Title>
        {value.description && (
          <RadixToast.Description className='text-sm text-gray-700'>{value.description}</RadixToast.Description>
        )}
      </div>
    </RadixToast.Root>
  );
};

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const openToast = useCallback((params: OpenToastParams) => {
    const id = genRandomId();
    setToasts((prev) => [...prev, { id, isOpen: true, ...params }]);
  }, []);

  const closeToast = useCallback((id: string) => {
    setToasts((prev) => prev.map((value) => (value.id === id ? { ...value, isOpen: false } : value)));

    setTimeout(() => {
      setToasts((prev) => prev.filter((value) => value.id !== id));
    }, 200);
  }, []);

  return (
    <OpenToastContext.Provider value={openToast}>
      <RadixToast.Provider duration={5000}>
        {children}
        {toasts.map((value) => (
          <Toast key={value.id} value={value} onClose={closeToast} />
        ))}
        <RadixToast.Viewport className='fixed right-0 top-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]' />
      </RadixToast.Provider>
    </OpenToastContext.Provider>
  );
};
