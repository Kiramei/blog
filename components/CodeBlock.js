import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDark from './vsc-dark-plus';
const CodeBlock = ({textContent,language}) => {
  return (
    <div>
    <div style={{
      marginTop:15,
      fontSize:25,
      fontWeight:600
    }}>代码区域</div>
    <div id='codeBlock'>
      <SyntaxHighlighter
        showLineNumbers={true}
        lineNumberStyle={{ color: '#ddd', fontSize: 10 }}
        language={language}
        style={vscDark}
        PreTag='div'
      >
        {String(textContent).replace(/\n$/,'')}
      </SyntaxHighlighter>
     </div>
    </div>
  );
};

export default CodeBlock;
