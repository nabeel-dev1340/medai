import "./App.css";
import { ModeToggle } from "./components/mode-toggle";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

// TODO refactor to UploadComponent
function App() {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone();

  // ? optimize using useCallback ?
  const submit = async () => {
    // TODO show a toast saying uploading
    const formData = new FormData(); // same as encType=mutlipart/form-data

    const KEY = "files[]";

    acceptedFiles.forEach((file) => {
      formData.append(KEY, file);
    });
    console.log("formData >>>", formData.getAll(KEY));

    const sendReq = async () => {
      await new Promise((res) => setTimeout(res, 2000)); // FIXME remove artificial delay
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
    <main className="min-w-screen h-full min-h-screen w-full p-2">
      <div className="flex w-full justify-between">
        <Label className="text-lg">Med AI</Label>
        <ModeToggle />
      </div>
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
      </div>
    </main>
  );
}

export default App;
