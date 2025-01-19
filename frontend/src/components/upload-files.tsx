import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";

export interface UploadFilesProps {}

function UploadFiles() {
  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      accept: {
        "image/jpeg": [".png", ".jpeg", ".jpg"],
        "application/pdf": [".pdf", ".doc", ".docx"],
      },
    });

  if (fileRejections.length !== 0) {
    toast.error("file type not supported");
  }

  // ? optimize using useCallback ?
  const submit = async () => {
    const formData = new FormData(); // same as encType=mutlipart/form-data

    const KEY = "files[]";

    acceptedFiles.forEach((file) => {
      formData.append(KEY, file);
    });
    const sendReq = async () => {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error();
      }

      return res.body;
    };

    toast.promise(sendReq(), {
      loading: "Loading...",
      success: (_) => {
        return "Upload Successful!";
      },
      error: "Oops! something went wrong",
    });
  };

  return (
    <div className="mx-auto flex w-4/5 flex-col gap-4">
      <div
        {...getRootProps({ className: "dropzone" })}
        className="flex min-h-32 items-center justify-center rounded-md border-2 border-dashed border-white bg-inherit"
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>

      <Button disabled={acceptedFiles.length === 0} onClick={submit}>
        Submit
      </Button>
      {acceptedFiles.map((file, i) => {
        return (
          <div key={i}>
            <Label>{file.name}</Label>
            {/* // TODO show file extension icon? */}
            {/* // TODO remove selection icon? */}
          </div>
        );
      })}
    </div>
  );
}

export default UploadFiles;
