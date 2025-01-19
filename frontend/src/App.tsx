import "./App.css";
import { ModeToggle } from "./components/mode-toggle";
import { Label } from "./components/ui/label";
import UploadFiles from "./components/upload-files";

function App() {
  return (
    <main className="min-w-screen h-full min-h-screen w-full p-2">
      <div className="flex w-full justify-between">
        <Label className="text-lg">Med AI</Label>
        <ModeToggle />
      </div>
      <UploadFiles />
    </main>
  );
}

export default App;
