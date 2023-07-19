import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent } from "react";

interface FileInputProps {
  setFile: (file: Blob) => void;
}

export function InputFile({ setFile }: FileInputProps) {
  const handleFileSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });
      setFile(blob);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Input id="pdf" type="file" onChange={handleFileSelected} />
    </div>
  );
}
