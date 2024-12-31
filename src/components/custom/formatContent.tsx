export const formatContent = (content: string) => {
    
    const formattedContent = content.split("\n").map((line, i) => {
      // Replace first single asterisk (*) with "->"
      if (line.trim().startsWith("* ")) {
        line = line.replace(/^\*\s/, "-> ");
      }

      const parts = line.split(/(\*\*.*?\*\*)/g); // Split by bold syntax (**bold**)

      return (
        <span key={i}>
          {parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={j}>
                  {part.substring(2, part.length - 2)} {/* Remove ** */}
                </strong>
              );
            }
            return <span key={j}>{part}</span>;
          })}
          {i < content.split("\n").length - 1 && <br />}
        </span>
      );
    });

    return formattedContent;
};