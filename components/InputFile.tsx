import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent } from "react";

interface FileInputProps {
  setFile: (file: any) => void;
}

export function InputFile({ setFile, ...props }: FileInputProps) {
  const handleFileSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.files", e.target.files);
    setFile(e);

    try {
      const file = e.target.files?.[0];
      console.log("filefile", file);
      if (file) {
        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([new Uint8Array(arrayBuffer)], {
          type: file.type,
        });
        setFile(blob);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Input
        id="pdf"
        type="file"
        onChange={(e) => {
          handleFileSelected(e);
        }}
        {...props}
      />
    </div>
  );
}
