import { useEffect, useState } from "react";

const InputMusic = () => {
  const [selectedFiles, setFiles] = useState<string[]>([]);
  const [loadingFiles, setLoadFiles] = useState<string[]>([]);

  // 親パスは一回だけ決める。その親パスの中で、音楽ディレクトリを作っていく
  // ディレクトリは階層構造OK　最初の１回ですべての読み取りを終えたい
  // その読み取りのあとにファイルを追加する場合は、ディレクトリを指定してファイルをアップロードしていく
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };
 
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!e?.dataTransfer?.items[0]) {
      return null;
    }
 
    const item = e.dataTransfer.items[0];
    const entry = item.webkitGetAsEntry();

    if (!entry) {
      return;
    }

    if (entry.isFile) {
      return;
    }

    const scanDirFile = async (entry: FileSystemDirectoryEntry, depth = 0) => {
      if (depth >= 2) {
        // TODO: 深さが2以上のディレクトリは無視されます。
        return;
      }

      const directoryReader = (entry as FileSystemDirectoryEntry).createReader();
      const entries: FileSystemEntry[] = await new Promise((resolve) => {
        directoryReader.readEntries((entries: FileSystemEntry[]) => {
          resolve(entries);
        });
      });

      await Promise.all(entries.map(async (item) => {
        if (item.isDirectory) {
          await scanDirFile(item as FileSystemDirectoryEntry, ++depth);
        }
      }));

      setFiles((current) => [...current, ...entries.filter((item) => item.isFile).map((item) => item.fullPath)]);
    };
    
    if (entry.isDirectory) {
      await scanDirFile(entry as FileSystemDirectoryEntry);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div onDragOver={handleDragOver} onDrop={handleDrop}>
        Please Drag and Drop Directory here !
      </div>
      {selectedFiles.map((fileName) => {
        return (
          <div>{fileName}</div>
        );
      })}
    </div>
  );
}

export default InputMusic;