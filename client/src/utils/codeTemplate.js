/**
 * codeTemplate.js
 *
 * Splits full skeleton code (which includes main + boilerplate) into:
 *   - prefix:   hidden lines before the function (imports, class open)
 *   - userCode: the FUNCTION SIGNATURE + body that the user edits
 *   - suffix:   hidden lines after the function (main method, class close)
 *
 * The user sees the function signature + editable body.
 * When submitting/running, we send prefix + userCode + suffix as the full code.
 */

/** Markers placed inside skeleton strings to denote edit boundaries */
const EDIT_START    = '// Write your code here';
const EDIT_START_PY = '# Write your code here';

/**
 * Returns the starter body comment/placeholder for a given language.
 * This shows users what to write inside the function.
 */
function getStarterBody(language) {
  switch (language) {
    case 'python': return '    # Write your solution here\n    pass\n';
    case 'java':   return '        // Write your solution here\n        \n';
    case 'cpp':    return '    // Write your solution here\n    \n';
    case 'c':      return '    // Write your solution here\n    \n';
    default:       return '    // Write your solution here\n    \n';
  }
}

/**
 * Given a full skeleton code string, extract:
 * - prefix:   everything BEFORE the function definition (imports, class decl)
 * - userCode: function signature + editable body (user sees and writes this)
 * - suffix:   closing brace of function + main() block
 *
 * Returns { prefix, userCode, suffix }
 */
export function splitSkeletonCode(fullCode, language) {
  if (!fullCode) return { prefix: '', userCode: '', suffix: '' };

  const lines = fullCode.split('\n');
  const commentMarker = language === 'python' ? EDIT_START_PY : EDIT_START;

  // Find the line with the edit marker
  const markerIndex = lines.findIndex(l => l.includes(commentMarker));

  if (markerIndex === -1) {
    // No marker found — treat entire code as user-editable (fallback)
    return { prefix: '', userCode: fullCode, suffix: '' };
  }

  // ── PYTHON ──────────────────────────────────────────────────────────────
  if (language === 'python') {
    // Find the "def print_pattern(n):" line (one line before the marker)
    const defLineIndex = markerIndex - 1;
    const mainIndex = lines.findIndex(l => l.trim().startsWith("if __name__"));

    // prefix: everything before the def line (e.g. nothing, or future imports)
    const prefixLines  = defLineIndex > 0 ? lines.slice(0, defLineIndex) : [];

    // userCode: "def print_pattern(n):" + starter body
    // Python has no closing brace, so just the def + body is complete
    const defLine      = lines[defLineIndex] || 'def print_pattern(n):';
    const starterBody  = '    # Write your solution here\n    pass\n';
    const userCode     = defLine + '\n' + starterBody;

    // suffix: __main__ block
    const suffixLines  = mainIndex !== -1 ? lines.slice(mainIndex) : [];

    return {
      prefix:   prefixLines.length > 0 ? prefixLines.join('\n') : '',
      userCode,
      suffix:   suffixLines.length > 0 ? '\n' + suffixLines.join('\n') : ''
    };
  }

  // ── JAVA / C++ / C ──────────────────────────────────────────────────────
  // Find the function signature line (one line before the marker):
  //   Java:  "    public static void printPattern(int n) {"
  //   C/C++: "void printPattern(int n) {"
  const funcSignatureIndex = markerIndex - 1;

  // Find where main() begins (to know where suffix starts)
  const mainMethodIndex = lines.findIndex((l, i) =>
    i > markerIndex && (
      l.includes('public static void main') || // Java
      l.trim() === 'int main() {'  ||
      l.trim() === 'int main(){'   ||
      l.includes('int main(')
    )
  );

  // Find where the user function's closing "}" is
  let funcEndIndex = mainMethodIndex !== -1 ? mainMethodIndex - 1 : lines.length - 1;
  while (funcEndIndex > markerIndex && lines[funcEndIndex].trim() === '') {
    funcEndIndex--;
  }
  const funcClosingBrace = lines[funcEndIndex]; // e.g. "    }" or "}"

  // prefix: everything BEFORE the function signature line
  // (imports, class open brace, etc.)
  const prefixLines = funcSignatureIndex > 0
    ? lines.slice(0, funcSignatureIndex)
    : [];

  // userCode: function signature + starter body + closing brace
  // The closing brace is VISIBLE so users see a complete function stub
  const funcSignature = lines[funcSignatureIndex] || '';
  const indent        = language === 'java' ? '        ' : '    ';
  const starterBody   = indent + '// Write your solution here\n' + indent + '\n';
  const userCode      = funcSignature + '\n' + starterBody + funcClosingBrace + '\n';

  // suffix: only the blank line + main block (closing brace is now in userCode)
  const suffixLines = mainMethodIndex !== -1
    ? ['', ...lines.slice(mainMethodIndex)]
    : [];

  return {
    prefix:   prefixLines.join('\n'),
    userCode,
    suffix:   suffixLines.length > 0 ? '\n' + suffixLines.join('\n') : ''
  };
}

/**
 * Reconstruct the full code to send to the judge:
 * prefix + '\n' + userCode + suffix
 */
export function buildFullCode(prefix, userCode, suffix) {
  // If prefix is empty, no leading newline needed
  const head = prefix ? prefix + '\n' : '';
  return head + userCode + suffix;
}
