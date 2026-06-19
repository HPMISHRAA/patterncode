const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

let useMockDb = false;

// Listen for connection events to verify PG status
pool.connect((err, client, release) => {
  if (err) {
    console.warn('[PostgreSQL Offline] Could not connect to database on port 5432. Enabling client-side In-Memory Mock Database.');
    useMockDb = true;
  } else {
    console.log('PostgreSQL database pool connected successfully.');
    release();
  }
});

// IN-MEMORY DATA STORE (Synchronized with DDL Seeds)
const MOCK_STORE = {
  users: [
    {
      id: 'mock-user-db-id',
      firebase_uid: 'mock-uid-googleuser',
      email: 'googleuser@patterncode.com',
      display_name: 'Google Developer',
      current_streak: 5,
      longest_streak: 8,
      last_solved_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      is_admin: true,
      created_at: new Date().toISOString()
    }
  ],
  problems: [
    {
      id: 'p-uuid-1',
      title: 'Right-Angled Triangle',
      slug: 'right-angled-triangle',
      description: 'Given an integer N, print a right-angled triangle pattern of stars of height N. The first row contains 1 star, the second contains 2, and so on until the N-th row which contains N stars.',
      category: 'Star Patterns',
      difficulty: 'Easy',
      constraints: { min_n: 1, max_n: 20 },
      input_format: { type: 'integer', description: 'A single integer N representing the height of the triangle.' },
      output_format: { type: 'string', description: 'Print the right-angled triangle of stars.' },
      hints: [
        'Use a loop to iterate from 1 to N for the rows.',
        'Inside the outer loop, use an inner loop to print stars.',
        'In row i, you need to print exactly i stars. Remember to print a new line after each row.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    for i in range(1, n + 1):\n        print('*' * i)\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n        for (int i = 1; i <= n; i++) {\n            for (int j = 1; j <= i; j++) {\n                System.out.print(\"*\");\n            }\n            System.out.println();\n        }\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) {\n            cout << \"*\";\n        }\n        cout << endl;\n    }\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) {\n            printf(\"*\");\n        }\n        printf(\"\\n\");\n    }\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-2',
      title: 'Hollow Square',
      slug: 'hollow-square',
      description: 'Given an integer N, print a hollow square pattern of stars of size N x N. The border of the square should consist of stars, while the inside should be empty (spaces).',
      category: 'Hollow Patterns',
      difficulty: 'Easy',
      constraints: { min_n: 2, max_n: 20 },
      input_format: { type: 'integer', description: 'A single integer N representing the size of the square.' },
      output_format: { type: 'string', description: 'Print the hollow square pattern of stars of size N x N.' },
      hints: [
        'For rows 1 and N, print N stars.',
        'For rows in between (2 to N-1), print a star at the first position, N-2 spaces, and a star at the N-th position.',
        'Use conditional statements inside the nested loops to check if you are on the boundary.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-3',
      title: 'Number Pyramid',
      slug: 'number-pyramid',
      description: 'Given an integer N, print a centered pyramid of numbers of height N. The i-th row should be indented with spaces, followed by numbers counting up from 1 to i, and then back down to 1.',
      category: 'Number Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 1, max_n: 10 },
      input_format: { type: 'integer', description: 'A single integer N representing the height of the pyramid.' },
      output_format: { type: 'string', description: 'Print the centered number pyramid.' },
      hints: [
        'For each row i (from 1 to N), print N - i leading spaces first.',
        'Then, print numbers from 1 to i.',
        'After reaching i, print numbers decreasing from i - 1 down to 1. Finally, print a new line.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-4',
      title: 'Hollow Diamond',
      slug: 'hollow-diamond',
      description: 'Given an integer N, print a hollow diamond pattern of height 2N - 1. For N = 3, the output will have a maximum width of 5 at the center row.',
      category: 'Diamond Patterns',
      difficulty: 'Hard',
      constraints: { min_n: 2, max_n: 15 },
      input_format: { type: 'integer', description: 'A single integer N representing the radius of the diamond.' },
      output_format: { type: 'string', description: 'Print the hollow diamond pattern.' },
      hints: [
        'Split the drawing logic into the top half (first N rows) and bottom half (next N - 1 rows).',
        'For each row in the top half, print N - i spaces, a star, then print 2*i - 3 spaces (if i > 1), and another star.',
        'Mirror this logic for the bottom half of the diamond.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-5',
      title: 'Inverted Right Triangle',
      slug: 'inverted-right-triangle',
      description: 'Given an integer N, print a right-angled triangle pointing downwards of height N. The first row contains N stars, the second contains N-1 stars, and so on until the N-th row which contains 1 star.',
      category: 'Star Patterns',
      difficulty: 'Easy',
      constraints: { min_n: 1, max_n: 20 },
      input_format: { type: 'integer', description: 'A single integer N representing the height of the triangle.' },
      output_format: { type: 'string', description: 'Print the inverted right-angled triangle of stars.' },
      hints: [
        'Use a loop to count down from N to 1 or run an outer loop from 1 to N.',
        'In row i, print N - i + 1 stars.',
        'Remember to print a new line at the end of each row.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    for i in range(n, 0, -1):\n        print('*' * i)\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-6',
      title: 'Alphabet Triangle',
      slug: 'alphabet-triangle',
      description: 'Given an integer N, print a triangle of characters of height N. The first row contains \'A\' (1 time), the second row contains \'B\' (2 times), and so on until the N-th row which contains the N-th uppercase alphabet character (N times).',
      category: 'Character Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 1, max_n: 26 },
      input_format: { type: 'integer', description: 'A single integer N representing the height of the triangle.' },
      output_format: { type: 'string', description: 'Print the character triangle pattern.' },
      hints: [
        'Use an outer loop running from 0 to N-1 (or 1 to N).',
        'To print characters, cast ASCII values: \'A\' has value 65. In row i, print character (char)(65 + i).',
        'The number of characters in row i is equal to the row index (starting from 1).'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-7',
      title: 'Hollow Triangle',
      slug: 'hollow-triangle',
      description: 'Given an integer N, print a hollow right-angled triangle of height N. The border of the triangle should consist of stars, while the inside should be empty (spaces).',
      category: 'Hollow Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 2, max_n: 20 },
      input_format: { type: 'integer', description: 'A single integer N representing the height of the triangle.' },
      output_format: { type: 'string', description: 'Print the hollow right-angled triangle.' },
      hints: [
        'The first row has 1 star. The last row has N stars.',
        'For intermediate rows (2 to N-1), print a star at the first and last position, with spaces in between.',
        'The number of spaces in row i is i - 2.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-8',
      title: 'Star Pyramid',
      slug: 'star-pyramid',
      description: 'Given an integer N, print a centered pyramid of stars of height N. Row i should be indented with spaces, followed by stars.',
      category: 'Pyramid Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 1, max_n: 15 },
      input_format: { type: 'integer', description: 'A single integer N representing the height of the pyramid.' },
      output_format: { type: 'string', description: 'Print the centered star pyramid.' },
      hints: [
        'For each row i (from 1 to N), print N - i spaces first.',
        'Then print 2 * i - 1 stars.',
        'Remember to print a newline after printing all stars for a row.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-9',
      title: 'Solid Diamond',
      slug: 'solid-diamond',
      description: 'Given an integer N, print a centered solid diamond of stars of height 2N-1. The maximum width at the center row is 2N-1 stars.',
      category: 'Diamond Patterns',
      difficulty: 'Hard',
      constraints: { min_n: 2, max_n: 15 },
      input_format: { type: 'integer', description: 'A single integer N representing the radius/half-height of the diamond.' },
      output_format: { type: 'string', description: 'Print the centered solid diamond pattern.' },
      hints: [
        'Split the pattern drawing logic into the top half (including middle row, N rows) and bottom half (N-1 rows).',
        'For top half row i (1 to N), print N - i spaces, then 2 * i - 1 stars.',
        'For bottom half row i (1 to N-1), print i spaces, then 2 * (N - i) - 1 stars.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-10',
      title: "Pascal's Triangle",
      slug: 'pascals-triangle',
      description: 'Given an integer N, print the first N rows of Pascal\'s Triangle. Each row should contain space-separated integers, representing the coefficients of the binomial expansion. Do not include leading spaces.',
      category: 'Advanced Patterns',
      difficulty: 'Hard',
      constraints: { min_n: 1, max_n: 12 },
      input_format: { type: 'integer', description: 'A single integer N representing the number of rows.' },
      output_format: { type: 'string', description: 'Print the first N rows of Pascal\'s Triangle with numbers separated by spaces.' },
      hints: [
        'The value at row i (0-indexed) and column j (0-indexed) is given by the combination formula C(i, j) = i! / (j! * (i-j)!).',
        'You can calculate values iteratively: value = value * (i - j) / j.',
        'For each row, print the values separated by spaces. Print a newline at the end of each row.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-11',
      title: 'Alphabet Increasing Triangle',
      slug: 'alphabet-increasing-triangle',
      description: 'Given an integer N, print a right-angled triangle pattern of letters of height N. Row i contains uppercase letters starting from \'A\' up to the character matching the row index length.',
      category: 'Character Patterns',
      difficulty: 'Easy',
      constraints: { min_n: 1, max_n: 26 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the increasing alphabetical triangle.' },
      hints: [
        'Run a loop from 1 to N for the rows.',
        'Inside, loop from 0 to i-1 to print characters: \'A\' + j.',
        'Make sure to print a new line after each row.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    for i in range(1, n + 1):\n        row = \"\".join(chr(65 + j) for j in range(i))\n        print(row)\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-12',
      title: 'Alphabet Decreasing Triangle',
      slug: 'alphabet-decreasing-triangle',
      description: 'Given an integer N, print a right-angled triangle of letters pointing downwards. Row i contains letters from \'A\' up to character N - i + 1.',
      category: 'Character Patterns',
      difficulty: 'Easy',
      constraints: { min_n: 1, max_n: 26 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the decreasing alphabet triangle.' },
      hints: [
        'Run an outer loop to count down from N to 1.',
        'Inside, print letters from \'A\' up to that length.',
        'Remember newlines.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-13',
      title: 'Decreasing Number Triangle',
      slug: 'decreasing-number-triangle',
      description: 'Given an integer N, print a downward right-angled triangle of numbers. Row i contains numbers from 1 to N - i + 1.',
      category: 'Number Patterns',
      difficulty: 'Easy',
      constraints: { min_n: 1, max_n: 20 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the decreasing number triangle.' },
      hints: [
        'Outer loop runs N down to 1.',
        'Inner loop prints digits from 1 up to current outer index.',
        'Print new line.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-14',
      title: 'Number Pyramid Spaced',
      slug: 'number-pyramid-spaced',
      description: 'Given an integer N, print a centered number pyramid where adjacent numbers in the same row are separated by a single space.',
      category: 'Number Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 1, max_n: 15 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the spaced number pyramid.' },
      hints: [
        'Row i requires N - i leading spaces.',
        'Print numbers from 1 to i separated by a space character.',
        'Take care not to print trailing spaces if strictly comparing outputs.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-15',
      title: 'Star Pyramid Spaced',
      slug: 'star-pyramid-spaced',
      description: 'Given an integer N, print a centered star pyramid where adjacent stars in the same row are separated by a single space.',
      category: 'Star Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 1, max_n: 20 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the spaced star pyramid.' },
      hints: [
        'Print N - i spaces at the beginning of row i.',
        'Then print i stars separated by spaces.',
        'Make sure there are no trailing spaces on lines if possible.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-16',
      title: 'Alphabet Pyramid Spaced',
      slug: 'alphabet-pyramid-spaced',
      description: 'Given an integer N, print a centered alphabet pyramid where characters in the same row are separated by a single space.',
      category: 'Character Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 1, max_n: 26 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the spaced alphabet pyramid.' },
      hints: [
        'Print N - i spaces.',
        'Loop j from 0 to i-1 to print character \'A\' + j, followed by a space.',
        'Print newline.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-17',
      title: 'Mirrored Right Triangle',
      slug: 'mirrored-right-triangle',
      description: 'Given an integer N, print a right-aligned triangle of stars of height N. Row i contains N - i spaces followed by i stars.',
      category: 'Star Patterns',
      difficulty: 'Easy',
      constraints: { min_n: 1, max_n: 20 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the right-aligned star triangle.' },
      hints: [
        'Calculate spaces for row i: N - i.',
        'Print those spaces, then print i stars.',
        'Use loops or string multiplication.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    for i in range(1, n + 1):\n        print(\" \" * (n - i) + \"*\" * i)\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-18',
      title: 'Alphabet Mirrored Right Triangle',
      slug: 'alphabet-mirrored-right-triangle',
      description: 'Given an integer N, print a right-aligned triangle of letters. Row i contains N - i spaces followed by characters starting from \'A\' up to the row length.',
      category: 'Character Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 1, max_n: 26 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the right-aligned alphabetical triangle.' },
      hints: [
        'Print N - i spaces.',
        'Then, print letters from \'A\' to \'A\' + i - 1 without spaces.',
        'Print newline.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-19',
      title: 'Number Hourglass Left',
      slug: 'number-hourglass-left',
      description: 'Given an integer N, print a left-aligned hourglass shape of numbers. The top half decreases from length N down to 1, and the bottom half increases back to N.',
      category: 'Number Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 2, max_n: 15 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the left-aligned number hourglass.' },
      hints: [
        'The pattern contains 2N - 1 rows.',
        'Rows 1 to N run with decreasing length: N - row + 1. Print numbers starting from 1.',
        'Rows N+1 to 2N-1 run with increasing length from 2 to N.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-20',
      title: 'Star Hourglass Spaced',
      slug: 'star-hourglass-spaced',
      description: 'Given an integer N, print a centered hourglass shape of stars of height 2N-1, where stars are separated by single spaces.',
      category: 'Star Patterns',
      difficulty: 'Hard',
      constraints: { min_n: 2, max_n: 15 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the spaced star hourglass.' },
      hints: [
        'For the top half (rows 1 to N), row i has i-1 leading spaces, and N - i + 1 stars separated by spaces.',
        'For the bottom half (rows N+1 to 2N-1), the row has 2N - 1 - row leading spaces, and row - N + 1 stars separated by spaces.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-21',
      title: 'Number Increasing Pyramid',
      slug: 'number-increasing-pyramid',
      description: 'Given an integer N, print a left-aligned triangle pattern of numbers of height N. The first row contains "1", the second row contains "1 2", and the i-th row contains numbers from 1 to i separated by a single space.',
      category: 'Number Patterns',
      difficulty: 'Easy',
      constraints: { min_n: 1, max_n: 20 },
      input_format: { type: 'integer', description: 'A single integer N representing the height of the pattern.' },
      output_format: { type: 'string', description: 'Print the number increasing pyramid pattern.' },
      hints: [
        'Use a loop to iterate through each row from 1 to N.',
        'In row i, use an inner loop or utility to print numbers from 1 to i separated by a space.',
        'Ensure there are no trailing spaces at the end of each row.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-22',
      title: 'Number Changing Pyramid',
      slug: 'number-changing-pyramid',
      description: 'Given an integer N, print a left-aligned triangle pattern of numbers of height N where the numbers increment sequentially starting from 1. Adjacent numbers in the same row should be separated by a single space.',
      category: 'Number Patterns',
      difficulty: 'Easy',
      constraints: { min_n: 1, max_n: 15 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the number changing pyramid pattern.' },
      hints: [
        'Keep a counter variable initialized to 1.',
        'For each row i from 1 to N, print i numbers, incrementing the counter each time.',
        'Separate numbers in a row by a single space.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-23',
      title: 'Zero-One Triangle',
      slug: 'zero-one-triangle',
      description: 'Given an integer N, print a right-angled triangle of height N containing alternating 1s and 0s. The first element of row i is 1 if i is odd, and 0 if i is even, with alternating values following in that row separated by a single space.',
      category: 'Number Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 1, max_n: 20 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the zero-one triangle pattern.' },
      hints: [
        'Use nested loops where row i runs from 1 to N and column j runs from 1 to i.',
        'The value at row i and column j is 1 if (i + j) is even, and 0 if (i + j) is odd.',
        'Remember to print spaces between the values in each row.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-24',
      title: 'Rhombus Pattern',
      slug: 'rhombus-pattern',
      description: 'Given an integer N, print a rhombus pattern of stars of size N x N. The row i (0-indexed) should start with i spaces followed by N stars.',
      category: 'Star Patterns',
      difficulty: 'Easy',
      constraints: { min_n: 1, max_n: 20 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the rhombus pattern of stars.' },
      hints: [
        'For each row i from 0 to N - 1, print i leading spaces.',
        'Follow the spaces with N stars.',
        'No spaces are needed between the stars in this pattern.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-25',
      title: 'Butterfly Star Pattern',
      slug: 'butterfly-star-pattern',
      description: 'Given an integer N, print a butterfly star pattern of height 2N - 1. The wings of the butterfly are made of stars with spaces in the center.',
      category: 'Star Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 2, max_n: 15 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the butterfly star pattern.' },
      hints: [
        'Divide the pattern into a top half of N rows and a bottom half of N - 1 rows.',
        'For the top half row i (1 to N), print i stars, 2 * (N - i) spaces, and i stars.',
        'For the bottom half row i (N - 1 down to 1), mirror the top half logic.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-26',
      title: 'Square Fill Pattern',
      slug: 'square-fill-pattern',
      description: 'Given an integer N, print a solid N x N square pattern of stars.',
      category: 'Star Patterns',
      difficulty: 'Easy',
      constraints: { min_n: 1, max_n: 20 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the solid N x N square of stars.' },
      hints: [
        'Use nested loops to iterate through N rows and N columns.',
        'Print a star for every cell in the grid.',
        'Do not print spaces between stars in the same row.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-27',
      title: 'Reverse Left Half Pyramid',
      slug: 'reverse-left-half-pyramid',
      description: 'Given an integer N, print a right-aligned inverted triangle of stars. The first row contains N stars, the second row contains N - 1 stars preceded by 1 space, and the N-th row contains 1 star preceded by N - 1 spaces.',
      category: 'Star Patterns',
      difficulty: 'Easy',
      constraints: { min_n: 1, max_n: 20 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the reverse left half pyramid.' },
      hints: [
        'For each row i from 0 to N - 1, print i leading spaces.',
        'Follow the spaces by printing N - i stars.',
        'Do not print spaces between the stars.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-28',
      title: 'K Star Pattern',
      slug: 'k-star-pattern',
      description: 'Given an integer N, print a K-shaped star pattern of height 2N - 1. The top half decreases from N stars down to 1 star, and the bottom half increases back to N stars. Stars in each row should be separated by a single space.',
      category: 'Star Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 2, max_n: 20 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the K star pattern.' },
      hints: [
        'The pattern has 2N - 1 rows.',
        'The first N rows print stars counting down from N to 1, separated by spaces.',
        'The remaining N - 1 rows print stars counting up from 2 to N, separated by spaces.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-29',
      title: 'Reverse Number Triangle Pattern',
      slug: 'reverse-number-triangle-pattern',
      description: 'Given an integer N, print an inverted right triangle of numbers where each row i (1-indexed) has i-1 leading spaces and prints numbers from i to N separated by a single space.',
      category: 'Number Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 1, max_n: 15 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the reverse number triangle pattern.' },
      hints: [
        'For row i from 1 to N, print i - 1 leading spaces.',
        'Then print numbers starting from i up to N, separated by a single space.',
        'Use a loop or array join to construct the row.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-30',
      title: 'Mirror Image Triangle Pattern',
      slug: 'mirror-image-triangle-pattern',
      description: 'Given an integer N, print an hourglass pattern of numbers of height 2N - 1. The top half has row i (1-indexed) with i-1 leading spaces and numbers from i to N separated by a space. The bottom half mirrors this in reverse.',
      category: 'Number Patterns',
      difficulty: 'Hard',
      constraints: { min_n: 2, max_n: 15 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the mirror image triangle pattern.' },
      hints: [
        'This pattern is an hourglass of numbers composed of 2N - 1 rows.',
        'The top N rows decrease in width: row i has i-1 leading spaces and numbers from i to N.',
        'The bottom N-1 rows increase in width: row i (counting down from N to 1) has i-1 leading spaces and numbers from i to N.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-31',
      title: 'Hollow Triangle Pattern',
      slug: 'hollow-triangle-pattern',
      description: 'Given an integer N, print a hollow centered triangle pattern of height N. The first row has a single star centered at position N. The N-th row has 2N - 1 stars. The rows in between have stars only at the boundaries.',
      category: 'Hollow Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 2, max_n: 15 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the hollow triangle pattern of stars.' },
      hints: [
        'Row i (1 to N) requires N - i leading spaces.',
        'If i is 1, print a single star.',
        'If i is N, print 2 * N - 1 stars.',
        'For intermediate rows, print a star, followed by 2 * i - 3 spaces, followed by another star.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-32',
      title: 'Hollow Reverse Triangle Pattern',
      slug: 'hollow-reverse-triangle-pattern',
      description: 'Given an integer N, print an inverted hollow centered triangle pattern of height N.',
      category: 'Hollow Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 2, max_n: 15 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the hollow reverse triangle pattern.' },
      hints: [
        'This is the vertical mirror image of the hollow triangle pattern.',
        'Row 1 (the widest row) contains 2 * N - 1 stars.',
        'Row i (from 2 to N - 1) has i - 1 leading spaces, a star, 2 * (N - i) - 1 spaces, and another star.',
        'Row N has N - 1 leading spaces and a single star.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-33',
      title: 'Hollow Hourglass Pattern',
      slug: 'hollow-hourglass-pattern',
      description: 'Given an integer N, print a hollow hourglass pattern of stars of height 2N - 1. The top and bottom rows contain N stars separated by a single space. The middle row (row N) has N - 1 spaces followed by 1 star. Intermediate rows are hollow.',
      category: 'Hollow Patterns',
      difficulty: 'Hard',
      constraints: { min_n: 2, max_n: 15 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the hollow hourglass pattern.' },
      hints: [
        'The pattern has 2N - 1 rows and a central row N.',
        'Row 1 and row 2N - 1 print N stars separated by spaces.',
        'For row i (2 to N - 1) in the top half, print i - 1 leading spaces, a star, 2 * (N - i) - 1 spaces, and a star.',
        'The bottom half mirrors the top half.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-34',
      title: "Right Pascal's Triangle",
      slug: 'right-pascals-triangle',
      description: 'Given an integer N, print a left-aligned half-diamond pattern of stars of height 2N - 1. The first row contains 1 star, the N-th row contains N stars, and the last row contains 1 star.',
      category: 'Star Patterns',
      difficulty: 'Easy',
      constraints: { min_n: 1, max_n: 20 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the right Pascal\'s triangle of stars.' },
      hints: [
        'The pattern consists of 2N - 1 rows.',
        'The first N rows print stars incrementing from 1 to N.',
        'The remaining N - 1 rows print stars decrementing from N - 1 down to 1.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-35',
      title: 'Cross or X Star Pattern',
      slug: 'cross-star-pattern',
      description: 'Given an integer N, print a cross (X) pattern of stars of height 2N - 1. Each row index r (0-indexed) has stars at index r and (2N - 2 - r).',
      category: 'Star Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 1, max_n: 20 },
      input_format: { type: 'integer', description: 'A single integer N representing the half height.' },
      output_format: { type: 'string', description: 'Print the cross star pattern.' },
      hints: [
        'The pattern has size = 2 * N - 1 rows and columns.',
        'For each row r from 0 to size - 1, print stars at column index r and size - 1 - r, and spaces elsewhere.',
        'Strip trailing whitespaces from each line.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-36',
      title: 'Cross or X Number Pattern',
      slug: 'cross-number-pattern',
      description: 'Given an integer N, print a cross (X) pattern of numbers of height 2N - 1. Row r (0-indexed) prints the number r + 1 at the column indices r and (2N - 2 - r).',
      category: 'Number Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 1, max_n: 15 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the cross number pattern.' },
      hints: [
        'The pattern has size = 2 * N - 1 rows.',
        'For each row r, print the string representation of r + 1 at column index r and size - 1 - r.',
        'Do not print trailing spaces.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-37',
      title: 'Cross or X Character Pattern',
      slug: 'cross-character-pattern',
      description: "Given an integer N, print a cross (X) pattern of characters of height 2N - 1. Row r (0-indexed) prints the character matching 'A' + r at the column indices r and (2N - 2 - r).",
      category: 'Character Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 1, max_n: 15 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the cross character pattern.' },
      hints: [
        "The pattern size is 2 * N - 1.",
        "Convert index r to uppercase alphabet character: 'A' + r.",
        "Print this character at positions where column c equals r or size - 1 - r."
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-38',
      title: 'Inverted Full Pyramid',
      slug: 'inverted-full-pyramid',
      description: 'Given an integer N, print a centered inverted pyramid of stars of height N. The first row contains 2N - 1 stars, the second row contains 2N - 3 stars preceded by 1 space, and the N-th row contains 1 star preceded by N - 1 spaces.',
      category: 'Star Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 1, max_n: 15 },
      input_format: { type: 'integer', description: 'A single integer N representing the height of the pyramid.' },
      output_format: { type: 'string', description: 'Print the centered inverted pyramid of stars.' },
      hints: [
        'Use an outer loop to iterate from 0 to N - 1.',
        'For row i, print i leading spaces.',
        'Then print 2 * (N - i) - 1 stars.',
        'Do not print spaces between adjacent stars in the same row.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-39',
      title: 'Rhombus Pyramid',
      slug: 'rhombus-pyramid',
      description: 'Given an integer N, print a rhombus pattern of stars of size N x N slanted to the left. The row i (0-indexed) starts with N - 1 - i spaces followed by N stars.',
      category: 'Star Patterns',
      difficulty: 'Easy',
      constraints: { min_n: 1, max_n: 20 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the left-slanted rhombus pattern of stars.' },
      hints: [
        'For each row i from 0 to N - 1, print N - 1 - i leading spaces.',
        'Follow the spaces by printing N stars.',
        'No spaces are needed between the stars in this pattern.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-40',
      title: 'Hourglass Pyramid',
      slug: 'hourglass-pyramid',
      description: 'Given an integer N, print a centered solid hourglass pattern of stars of height 2N - 1. The top and bottom rows contain 2N - 1 stars, the middle row contains 1 star, and the intermediate rows are solid.',
      category: 'Star Patterns',
      difficulty: 'Hard',
      constraints: { min_n: 2, max_n: 15 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the centered solid hourglass star pattern.' },
      hints: [
        'The pattern has 2N - 1 rows and a central row N.',
        'The top half is an inverted full pyramid of height N.',
        'The bottom half is a centered full pyramid of height N - 1.',
        'Ensure stars are printed contiguously without spaces in each row.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-41',
      title: 'Concentric Number Square',
      slug: 'concentric-number-square',
      description: 'Given an integer N, print a concentric square pattern of numbers of size (2N - 1) x (2N - 1). The outermost border consists of the number N, the next inner border consists of N - 1, and so on, down to 1 in the center. The numbers in each row should be separated by a single space.',
      category: 'Number Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 1, max_n: 10 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the concentric square pattern of numbers.' },
      hints: [
        'The size of the output matrix is (2N - 1) x (2N - 1).',
        'For cell (r, c) (0-indexed), the value depends on the minimum distance to the top, bottom, left, and right boundaries.',
        'The minimum distance is min(r, c, (2N - 2 - r), (2N - 2 - c)).',
        'The value at (r, c) is calculated as N - min_distance.',
        'Print the numbers in each row separated by spaces. Ensure you do not leave trailing spaces.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-42',
      title: "Left Pascal's Triangle",
      slug: 'left-pascals-triangle',
      description: 'Given an integer N, print a left-pointing half-diamond pattern of stars. The pattern consists of 2N - 1 rows. The first row has N - 1 spaces followed by 1 star, the N-th row has 0 spaces followed by N stars, and the (2N - 1)-th row has N - 1 spaces followed by 1 star.',
      category: 'Star Patterns',
      difficulty: 'Easy',
      constraints: { min_n: 1, max_n: 20 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the left-pointing half-diamond pattern of stars.' },
      hints: [
        'The pattern consists of 2N - 1 rows.',
        'For row r from 0 to 2N - 2, let distance d = abs(N - 1 - r).',
        'Print d leading spaces followed by N - d stars.',
        'Do not print spaces between stars in this pattern.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-43',
      title: 'Heart Star Pattern',
      slug: 'heart-star-pattern',
      description: 'Given an even integer N, print a heart shape of stars. The width of the heart will align with the output for height (which consists of top lobes and a descending bottom cone).',
      category: 'Star Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 4, max_n: 20 },
      input_format: { type: 'integer', description: 'A single even integer N.' },
      output_format: { type: 'string', description: 'Print the heart star pattern.' },
      hints: [
        'The input N is assumed to be even. The pattern is split into a top part and a bottom part.',
        'For top part, let row i run from N/2 to N with step 2. Row i has (N - i)/2 spaces, i stars, (N - i) spaces, and i stars.',
        'For bottom part, let row i run from N down to 1 with step 1. Row i has (N - i) spaces followed by 2*i - 1 stars.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-44',
      title: 'Alphabet Hourglass Pattern',
      slug: 'alphabet-hourglass-pattern',
      description: 'Given an integer N, print a centered hourglass shape of uppercase letters. The letters in each row are separated by a single space, and the character printed changes from \'A\' at the outer rows to the N-th alphabet at the center row.',
      category: 'Character Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 1, max_n: 26 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the centered alphabet hourglass.' },
      hints: [
        'The pattern has 2N - 1 rows.',
        'For row r from 0 to 2N - 2, let d = abs(N - 1 - r).',
        'Row r has N - 1 - d leading spaces, followed by d + 1 characters separated by single spaces.',
        'The character printed is (char)(\'A\' + (N - 1 - d)).'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-45',
      title: 'Hollow Diamond of Numbers',
      slug: 'hollow-diamond-numbers',
      description: 'Given an integer N, print a hollow diamond shape of numbers of height 2N - 1. The numbers on row i match the row index level (1-indexed from top/bottom). The inside is empty.',
      category: 'Diamond Patterns',
      difficulty: 'Hard',
      constraints: { min_n: 2, max_n: 15 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the hollow diamond pattern of numbers.' },
      hints: [
        'The pattern has 2N - 1 rows.',
        'For row r from 0 to 2N - 2, let d = abs(N - 1 - r). The row prints value = N - d.',
        'If d == N - 1, print d spaces followed by value.',
        'Otherwise, print d spaces, value, 2 * (N - 1 - d) - 1 spaces, and value again.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-46',
      title: 'Solid Square Star',
      slug: 'solid-square-star',
      description: 'Given an integer N, print a solid filled square of stars of size N x N. Every row contains exactly N stars with no spaces.',
      category: 'Star Patterns',
      difficulty: 'Easy',
      constraints: { min_n: 1, max_n: 20 },
      input_format: { type: 'integer', description: 'A single integer N representing the side length of the square.' },
      output_format: { type: 'string', description: 'Print an N x N square of stars, one row per line.' },
      hints: [
        'Use an outer loop to iterate N times (for each row).',
        'Inside the outer loop, use an inner loop that runs N times to print N stars.',
        'Print a newline after each row.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-47',
      title: 'Number Crown',
      slug: 'number-crown',
      description: "Given an integer N, print a number crown pattern of height N. Row i (1-indexed) contains numbers 1 to i, then 2*(N-i) spaces, then numbers i down to 1. The result looks like a crown of numbers.",
      category: 'Number Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 1, max_n: 10 },
      input_format: { type: 'integer', description: 'A single integer N representing the height of the crown.' },
      output_format: { type: 'string', description: 'Print the number crown pattern.' },
      hints: [
        'For each row i (1 to N), print numbers from 1 to i.',
        'Then print 2*(N - i) spaces in the middle.',
        'Then print numbers from i down to 1.',
        'For the last row (i = N), there are no spaces in the middle — just numbers 1..N..1 printed together.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-48',
      title: 'Alpha-Hill',
      slug: 'alpha-hill',
      description: "Given an integer N, print a centered alphabetical hill pattern of height N. Row i (1-indexed) has N-i leading spaces, then characters from 'A' to the i-th letter, then back down from the (i-1)-th letter to 'A'. No spaces between characters within the row.",
      category: 'Character Patterns',
      difficulty: 'Medium',
      constraints: { min_n: 1, max_n: 13 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the centered alpha-hill pattern.' },
      hints: [
        "For row i (1 to N), print N - i leading spaces.",
        "Then print characters 'A', 'B', ..., up to 'A' + i - 1.",
        "Then print characters back from 'A' + i - 2 down to 'A'.",
        "For i = 1, only 'A' is printed."
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    },
    {
      id: 'p-uuid-49',
      title: 'Symmetric Void',
      slug: 'symmetric-void',
      description: "Given an integer N, print a symmetric void (double triangle) pattern of height 2N. The top half has rows with decreasing stars, increasing void, and decreasing stars. The bottom half mirrors the top. Stars in each half-row are separated by spaces, and the void in the center grows and shrinks.",
      category: 'Star Patterns',
      difficulty: 'Hard',
      constraints: { min_n: 2, max_n: 10 },
      input_format: { type: 'integer', description: 'A single integer N.' },
      output_format: { type: 'string', description: 'Print the symmetric void pattern.' },
      hints: [
        'The pattern has 2N rows total. The top N rows and bottom N rows are mirrors of each other.',
        'For the top half, row i (0-indexed from 0 to N-1): print N-i stars, then 2*i spaces, then N-i stars.',
        'For the bottom half, row i (0-indexed from 0 to N-1): print i+1 stars, then 2*(N-1-i) spaces, then i+1 stars.',
        'Stars within each wing are printed without spaces between them.'
      ],
      skeleton_code_json: {
        python: "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    n = int(input().strip())\n    print_pattern(n)",
        java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        cpp: "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        c: "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
      }
    }
  ],
  test_cases: [
    { problem_slug: 'right-angled-triangle', input: '1', expected_output: '*', is_sample: true },
    { problem_slug: 'right-angled-triangle', input: '3', expected_output: '*\n**\n***', is_sample: true },
    { problem_slug: 'right-angled-triangle', input: '5', expected_output: '*\n**\n***\n****\n*****', is_sample: false },
    { problem_slug: 'hollow-square', input: '2', expected_output: '**\n**', is_sample: true },
    { problem_slug: 'hollow-square', input: '4', expected_output: '****\n*  *\n*  *\n****', is_sample: true },
    { problem_slug: 'hollow-square', input: '5', expected_output: '*****\n*   *\n*   *\n*   *\n*****', is_sample: false },
    { problem_slug: 'number-pyramid', input: '1', expected_output: '1', is_sample: true },
    { problem_slug: 'number-pyramid', input: '3', expected_output: '  1\n 121\n12321', is_sample: true },
    { problem_slug: 'number-pyramid', input: '5', expected_output: '    1\n   121\n  12321\n 1234321\n123454321', is_sample: false },
    { problem_slug: 'hollow-diamond', input: '2', expected_output: ' *\n* *\n *', is_sample: true },
    { problem_slug: 'hollow-diamond', input: '3', expected_output: '  *\n * *\n*   *\n * *\n  *', is_sample: true },
    { problem_slug: 'hollow-diamond', input: '4', expected_output: '   *\n  * *\n *   *\n*     *\n *   *\n  * *\n   *', is_sample: false },
    { problem_slug: 'inverted-right-triangle', input: '1', expected_output: '*', is_sample: true },
    { problem_slug: 'inverted-right-triangle', input: '3', expected_output: '***\n**\n*', is_sample: true },
    { problem_slug: 'inverted-right-triangle', input: '4', expected_output: '****\n***\n**\n*', is_sample: false },
    { problem_slug: 'alphabet-triangle', input: '1', expected_output: 'A', is_sample: true },
    { problem_slug: 'alphabet-triangle', input: '3', expected_output: 'A\nBB\nCCC', is_sample: true },
    { problem_slug: 'alphabet-triangle', input: '4', expected_output: 'A\nBB\nCCC\nDDDD', is_sample: false },
    { problem_slug: 'hollow-triangle', input: '2', expected_output: '*\n**', is_sample: true },
    { problem_slug: 'hollow-triangle', input: '4', expected_output: '*\n**\n* *\n****', is_sample: true },
    { problem_slug: 'hollow-triangle', input: '5', expected_output: '*\n**\n* *\n*  *\n*****', is_sample: false },
    { problem_slug: 'star-pyramid', input: '1', expected_output: '*', is_sample: true },
    { problem_slug: 'star-pyramid', input: '3', expected_output: '  *\n ***\n*****', is_sample: true },
    { problem_slug: 'star-pyramid', input: '4', expected_output: '   *\n  ***\n *****\n*******', is_sample: false },
    { problem_slug: 'solid-diamond', input: '2', expected_output: ' *\n***\n *', is_sample: true },
    { problem_slug: 'solid-diamond', input: '3', expected_output: '  *\n ***\n*****\n ***\n  *', is_sample: true },
    { problem_slug: 'solid-diamond', input: '4', expected_output: '   *\n  ***\n *****\n*******\n *****\n  ***\n   *', is_sample: false },
    { problem_slug: 'pascals-triangle', input: '1', expected_output: '1', is_sample: true },
    { problem_slug: 'pascals-triangle', input: '3', expected_output: '1\n1 1\n1 2 1', is_sample: true },
    { problem_slug: 'pascals-triangle', input: '4', expected_output: '1\n1 1\n1 2 1\n1 3 3 1', is_sample: false },
    { problem_slug: 'pascals-triangle', input: '5', expected_output: '1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1', is_sample: false },
    { problem_slug: 'alphabet-increasing-triangle', input: '1', expected_output: 'A', is_sample: true },
    { problem_slug: 'alphabet-increasing-triangle', input: '3', expected_output: 'A\nAB\nABC', is_sample: true },
    { problem_slug: 'alphabet-increasing-triangle', input: '4', expected_output: 'A\nAB\nABC\nABCD', is_sample: false },
    { problem_slug: 'alphabet-decreasing-triangle', input: '1', expected_output: 'A', is_sample: true },
    { problem_slug: 'alphabet-decreasing-triangle', input: '3', expected_output: 'ABC\nAB\nA', is_sample: true },
    { problem_slug: 'alphabet-decreasing-triangle', input: '4', expected_output: 'ABCD\nABC\nAB\nA', is_sample: false },
    { problem_slug: 'decreasing-number-triangle', input: '1', expected_output: '1', is_sample: true },
    { problem_slug: 'decreasing-number-triangle', input: '3', expected_output: '123\n12\n1', is_sample: true },
    { problem_slug: 'decreasing-number-triangle', input: '4', expected_output: '1234\n123\n12\n1', is_sample: false },
    { problem_slug: 'number-pyramid-spaced', input: '1', expected_output: '1', is_sample: true },
    { problem_slug: 'number-pyramid-spaced', input: '3', expected_output: '  1\n 1 2\n1 2 3', is_sample: true },
    { problem_slug: 'number-pyramid-spaced', input: '4', expected_output: '   1\n  1 2\n 1 2 3\n1 2 3 4', is_sample: false },
    { problem_slug: 'star-pyramid-spaced', input: '1', expected_output: '*', is_sample: true },
    { problem_slug: 'star-pyramid-spaced', input: '3', expected_output: '  *\n * *\n* * *', is_sample: true },
    { problem_slug: 'star-pyramid-spaced', input: '4', expected_output: '   *\n  * *\n * * *\n* * * *', is_sample: false },
    { problem_slug: 'alphabet-pyramid-spaced', input: '1', expected_output: 'A', is_sample: true },
    { problem_slug: 'alphabet-pyramid-spaced', input: '3', expected_output: '  A\n A B\nA B C', is_sample: true },
    { problem_slug: 'alphabet-pyramid-spaced', input: '4', expected_output: '   A\n  A B\n A B C\nA B C D', is_sample: false },
    { problem_slug: 'mirrored-right-triangle', input: '1', expected_output: '*', is_sample: true },
    { problem_slug: 'mirrored-right-triangle', input: '3', expected_output: '  *\n **\n***', is_sample: true },
    { problem_slug: 'mirrored-right-triangle', input: '4', expected_output: '   *\n  **\n ***\n****', is_sample: false },
    { problem_slug: 'alphabet-mirrored-right-triangle', input: '1', expected_output: 'A', is_sample: true },
    { problem_slug: 'alphabet-mirrored-right-triangle', input: '3', expected_output: '  A\n AB\nABC', is_sample: true },
    { problem_slug: 'alphabet-mirrored-right-triangle', input: '4', expected_output: '   A\n  AB\n ABC\nABCD', is_sample: false },
    { problem_slug: 'number-hourglass-left', input: '2', expected_output: '12\n1\n12', is_sample: true },
    { problem_slug: 'number-hourglass-left', input: '3', expected_output: '123\n12\n1\n12\n123', is_sample: true },
    { problem_slug: 'number-hourglass-left', input: '4', expected_output: '1234\n123\n12\n1\n12\n123\n1234', is_sample: false },
    { problem_slug: 'star-hourglass-spaced', input: '2', expected_output: '* *\n *\n* *', is_sample: true },
    { problem_slug: 'star-hourglass-spaced', input: '3', expected_output: '* * *\n * *\n  *\n * *\n* * *', is_sample: true },
    { problem_slug: 'star-hourglass-spaced', input: '4', expected_output: '* * * *\n * * *\n  * *\n   *\n  * *\n * * *\n* * * *', is_sample: false },

    { problem_slug: 'number-increasing-pyramid', input: '1', expected_output: '1', is_sample: true },
    { problem_slug: 'number-increasing-pyramid', input: '3', expected_output: '1\n1 2\n1 2 3', is_sample: true },
    { problem_slug: 'number-increasing-pyramid', input: '5', expected_output: '1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5', is_sample: false },

    { problem_slug: 'number-changing-pyramid', input: '1', expected_output: '1', is_sample: true },
    { problem_slug: 'number-changing-pyramid', input: '3', expected_output: '1\n2 3\n4 5 6', is_sample: true },
    { problem_slug: 'number-changing-pyramid', input: '5', expected_output: '1\n2 3\n4 5 6\n7 8 9 10\n11 12 13 14 15', is_sample: false },

    { problem_slug: 'zero-one-triangle', input: '1', expected_output: '1', is_sample: true },
    { problem_slug: 'zero-one-triangle', input: '3', expected_output: '1\n0 1\n1 0 1', is_sample: true },
    { problem_slug: 'zero-one-triangle', input: '5', expected_output: '1\n0 1\n1 0 1\n0 1 0 1\n1 0 1 0 1', is_sample: false },

    { problem_slug: 'rhombus-pattern', input: '1', expected_output: '*', is_sample: true },
    { problem_slug: 'rhombus-pattern', input: '3', expected_output: '***\n ***\n  ***', is_sample: true },
    { problem_slug: 'rhombus-pattern', input: '5', expected_output: '*****\n *****\n  *****\n   *****\n    *****', is_sample: false },

    { problem_slug: 'butterfly-star-pattern', input: '2', expected_output: '*  *\n****\n*  *', is_sample: true },
    { problem_slug: 'butterfly-star-pattern', input: '3', expected_output: '*    *\n**  **\n******\n**  **\n*    *', is_sample: true },
    { problem_slug: 'butterfly-star-pattern', input: '4', expected_output: '*      *\n**    **\n***  ***\n********\n***  ***\n**    **\n*      *', is_sample: false },

    { problem_slug: 'square-fill-pattern', input: '1', expected_output: '*', is_sample: true },
    { problem_slug: 'square-fill-pattern', input: '3', expected_output: '***\n***\n***', is_sample: true },
    { problem_slug: 'square-fill-pattern', input: '5', expected_output: '*****\n*****\n*****\n*****\n*****', is_sample: false },

    { problem_slug: 'reverse-left-half-pyramid', input: '1', expected_output: '*', is_sample: true },
    { problem_slug: 'reverse-left-half-pyramid', input: '3', expected_output: '***\n **\n  *', is_sample: true },
    { problem_slug: 'reverse-left-half-pyramid', input: '5', expected_output: '*****\n ****\n  ***\n   **\n    *', is_sample: false },

    { problem_slug: 'k-star-pattern', input: '2', expected_output: '* *\n*\n* *', is_sample: true },
    { problem_slug: 'k-star-pattern', input: '3', expected_output: '* * *\n* *\n*\n* *\n* * *', is_sample: true },
    { problem_slug: 'k-star-pattern', input: '4', expected_output: '* * * *\n* * *\n* *\n*\n* *\n* * *\n* * * *', is_sample: false },

    { problem_slug: 'reverse-number-triangle-pattern', input: '1', expected_output: '1', is_sample: true },
    { problem_slug: 'reverse-number-triangle-pattern', input: '3', expected_output: '1 2 3\n 2 3\n  3', is_sample: true },
    { problem_slug: 'reverse-number-triangle-pattern', input: '4', expected_output: '1 2 3 4\n 2 3 4\n  3 4\n   4', is_sample: false },

    { problem_slug: 'mirror-image-triangle-pattern', input: '2', expected_output: '1 2\n 2\n 2\n1 2', is_sample: true },
    { problem_slug: 'mirror-image-triangle-pattern', input: '3', expected_output: '1 2 3\n 2 3\n  3\n  3\n 2 3\n1 2 3', is_sample: true },
    { problem_slug: 'mirror-image-triangle-pattern', input: '4', expected_output: '1 2 3 4\n 2 3 4\n  3 4\n   4\n   4\n  3 4\n 2 3 4\n1 2 3 4', is_sample: false },

    { problem_slug: 'hollow-triangle-pattern', input: '2', expected_output: ' *\n***', is_sample: true },
    { problem_slug: 'hollow-triangle-pattern', input: '3', expected_output: '  *\n * *\n*****', is_sample: true },
    { problem_slug: 'hollow-triangle-pattern', input: '5', expected_output: '    *\n   * *\n  *   *\n *     *\n*********', is_sample: false },

    { problem_slug: 'hollow-reverse-triangle-pattern', input: '2', expected_output: '***\n *', is_sample: true },
    { problem_slug: 'hollow-reverse-triangle-pattern', input: '3', expected_output: '*****\n * *\n  *', is_sample: true },
    { problem_slug: 'hollow-reverse-triangle-pattern', input: '5', expected_output: '*********\n *     *\n  *   *\n   * *\n    *', is_sample: false },

    { problem_slug: 'hollow-hourglass-pattern', input: '2', expected_output: '* *\n *\n* *', is_sample: true },
    { problem_slug: 'hollow-hourglass-pattern', input: '3', expected_output: '* * *\n * *\n  *\n * *\n* * *', is_sample: true },
    { problem_slug: 'hollow-hourglass-pattern', input: '4', expected_output: '* * * *\n *   *\n  * *\n   *\n  * *\n *   *\n* * * *', is_sample: false },

    { problem_slug: 'right-pascals-triangle', input: '1', expected_output: '*', is_sample: true },
    { problem_slug: 'right-pascals-triangle', input: '3', expected_output: '*\n**\n***\n**\n*', is_sample: true },
    { problem_slug: 'right-pascals-triangle', input: '5', expected_output: '*\n**\n***\n****\n*****\n****\n***\n**\n*', is_sample: false },

    { problem_slug: 'cross-star-pattern', input: '1', expected_output: '*', is_sample: true },
    { problem_slug: 'cross-star-pattern', input: '3', expected_output: '*   *\n * *\n  *\n * *\n*   *', is_sample: true },
    { problem_slug: 'cross-star-pattern', input: '4', expected_output: '*     *\n *   *\n  * *\n   *\n  * *\n *   *\n*     *', is_sample: false },

    { problem_slug: 'cross-number-pattern', input: '1', expected_output: '1', is_sample: true },
    { problem_slug: 'cross-number-pattern', input: '3', expected_output: '1   1\n 2 2\n  3\n 4 4\n5   5', is_sample: true },
    { problem_slug: 'cross-number-pattern', input: '4', expected_output: '1     1\n 2   2\n  3 3\n   4\n  5 5\n 6   6\n7     7', is_sample: false },

    { problem_slug: 'cross-character-pattern', input: '1', expected_output: 'A', is_sample: true },
    { problem_slug: 'cross-character-pattern', input: '3', expected_output: 'A   A\n B B\n  C\n D D\nE   E', is_sample: true },
    { problem_slug: 'cross-character-pattern', input: '4', expected_output: 'A     A\n B   B\n  C C\n   D\n  E E\n F   F\nG     G', is_sample: false },

    { problem_slug: 'inverted-full-pyramid', input: '1', expected_output: '*', is_sample: true },
    { problem_slug: 'inverted-full-pyramid', input: '3', expected_output: '*****\n ***\n  *', is_sample: true },
    { problem_slug: 'inverted-full-pyramid', input: '4', expected_output: '*******\n *****\n  ***\n   *', is_sample: false },

    { problem_slug: 'rhombus-pyramid', input: '1', expected_output: '*', is_sample: true },
    { problem_slug: 'rhombus-pyramid', input: '3', expected_output: '  ***\n ***\n***', is_sample: true },
    { problem_slug: 'rhombus-pyramid', input: '4', expected_output: '   ****\n  ****\n ****\n****', is_sample: false },

    { problem_slug: 'hourglass-pyramid', input: '2', expected_output: '***\n *\n***', is_sample: true },
    { problem_slug: 'hourglass-pyramid', input: '3', expected_output: '*****\n ***\n  *\n ***\n*****', is_sample: true },
    { problem_slug: 'hourglass-pyramid', input: '4', expected_output: '*******\n *****\n  ***\n   *\n  ***\n *****\n*******', is_sample: false },

    { problem_slug: 'concentric-number-square', input: '1', expected_output: '1', is_sample: true },
    { problem_slug: 'concentric-number-square', input: '3', expected_output: '3 3 3 3 3\n3 2 2 2 3\n3 2 1 2 3\n3 2 2 2 3\n3 3 3 3 3', is_sample: true },
    { problem_slug: 'concentric-number-square', input: '4', expected_output: '4 4 4 4 4 4 4\n4 3 3 3 3 3 4\n4 3 2 2 2 3 4\n4 3 2 1 2 3 4\n4 3 2 2 2 3 4\n4 3 3 3 3 3 4\n4 4 4 4 4 4 4', is_sample: false },

    { problem_slug: 'left-pascals-triangle', input: '1', expected_output: '*', is_sample: true },
    { problem_slug: 'left-pascals-triangle', input: '3', expected_output: '  *\n **\n***\n **\n  *', is_sample: true },
    { problem_slug: 'left-pascals-triangle', input: '4', expected_output: '   *\n  **\n ***\n****\n ***\n  **\n   *', is_sample: false },

    { problem_slug: 'heart-star-pattern', input: '4', expected_output: ' *   *\n*** ***\n*******\n *****\n  ***\n   *', is_sample: true },
    { problem_slug: 'heart-star-pattern', input: '6', expected_output: ' ***   ***\n***** *****\n***********\n *********\n  *******\n   *****\n    ***\n     *', is_sample: true },
    { problem_slug: 'heart-star-pattern', input: '8', expected_output: '  ****    ****\n ******  ******\n***************\n *************\n  ***********\n   *********\n    *******\n     *****\n      ***\n       *', is_sample: false },

    { problem_slug: 'alphabet-hourglass-pattern', input: '1', expected_output: 'A', is_sample: true },
    { problem_slug: 'alphabet-hourglass-pattern', input: '3', expected_output: 'A A A\n B B\n  C\n B B\nA A A', is_sample: true },
    { problem_slug: 'alphabet-hourglass-pattern', input: '4', expected_output: 'A A A A\n B B B\n  C C\n   D\n  C C\n B B B\nA A A A', is_sample: false },

    { problem_slug: 'hollow-diamond-numbers', input: '2', expected_output: ' 1\n2 2\n 1', is_sample: true },
    { problem_slug: 'hollow-diamond-numbers', input: '3', expected_output: '  1\n 2 2\n3   3\n 2 2\n  1', is_sample: true },
    { problem_slug: 'hollow-diamond-numbers', input: '4', expected_output: '   1\n  2 2\n 3   3\n4     4\n 3   3\n  2 2\n   1', is_sample: false },

    // Solid Square Star (p-uuid-46)
    { problem_slug: 'solid-square-star', input: '1', expected_output: '*', is_sample: true },
    { problem_slug: 'solid-square-star', input: '3', expected_output: '***\n***\n***', is_sample: true },
    { problem_slug: 'solid-square-star', input: '5', expected_output: '*****\n*****\n*****\n*****\n*****', is_sample: false },

    // Number Crown (p-uuid-47)
    { problem_slug: 'number-crown', input: '1', expected_output: '1', is_sample: true },
    { problem_slug: 'number-crown', input: '3', expected_output: '1    1\n12  21\n123321', is_sample: true },
    { problem_slug: 'number-crown', input: '4', expected_output: '1      1\n12    21\n123  321\n12344321', is_sample: false },

    // Alpha-Hill (p-uuid-48)
    { problem_slug: 'alpha-hill', input: '1', expected_output: 'A', is_sample: true },
    { problem_slug: 'alpha-hill', input: '3', expected_output: '  A\n ABA\nABCBA', is_sample: true },
    { problem_slug: 'alpha-hill', input: '5', expected_output: '    A\n   ABA\n  ABCBA\n ABCDCBA\nABCDEDCBA', is_sample: false },

    // Symmetric Void (p-uuid-49)
    { problem_slug: 'symmetric-void', input: '2', expected_output: '**  **\n*    *\n*    *\n**  **', is_sample: true },
    { problem_slug: 'symmetric-void', input: '3', expected_output: '***    ***\n**      **\n*        *\n*        *\n**      **\n***    ***', is_sample: true },
    { problem_slug: 'symmetric-void', input: '4', expected_output: '****      ****\n***        ***\n**          **\n*            *\n*            *\n**          **\n***        ***\n****      ****', is_sample: false }
  ],
  submissions: [
    {
      id: 'sub-uuid-1',
      user_id: 'mock-user-db-id',
      problem_id: 'p-uuid-1',
      status: 'Accepted',
      code: 'def print_pattern(n):\n    for i in range(1, n+1):\n        print("*" * i)',
      language: 'python',
      execution_time_ms: 15,
      memory_kb: 450,
      error_message: null,
      created_at: new Date(Date.now() - 86400000).toISOString()
    }
  ],
  badges: [
    { id: 'b-1', code: 'first_solved', name: 'First Pattern Solved', description: 'Successfully solved your first pattern printing problem!', icon_url: 'award-first' },
    { id: 'b-2', code: 'ten_solved', name: '10 Patterns Solved', description: 'Successfully solved 10 pattern printing problems!', icon_url: 'award-ten' },
    { id: 'b-3', code: 'star_master', name: 'Star Master', description: 'Solved 5 star pattern problems!', icon_url: 'star-glow' },
    { id: 'b-4', code: 'diamond_master', name: 'Diamond Master', description: 'Solved 3 diamond pattern problems!', icon_url: 'gem' },
    { id: 'b-5', code: 'streak_30', name: '30 Day Streak', description: 'Maintained a submission streak for 30 consecutive days!', icon_url: 'flame-badge' }
  ],
  user_badges: [
    { id: 'ub-1', user_id: 'mock-user-db-id', badge_id: 'b-1', earned_at: new Date(Date.now() - 86400000).toISOString() }
  ]
};

// MOCK QUERY RESOLVER INTERCEPTOR
function resolveMockQuery(text, params) {
  const query = text.trim().replace(/\s+/g, ' ');
  console.log(`[Mock DB Query Executing] ${query.substring(0, 100)}...`);

  // 1. SELECT * FROM users WHERE firebase_uid = $1
  if (query.includes('FROM users WHERE firebase_uid')) {
    const uid = params[0];
    let user = MOCK_STORE.users.find(u => u.firebase_uid === uid);
    if (!user) {
      const username = uid.split('-')[2] || 'dev';
      const isAdmin = username.toLowerCase().includes('admin') || username.toLowerCase().includes('dev') || username.toLowerCase().includes('googleuser');
      // Create user on the fly (matches signups)
      user = {
        id: `mock-user-${Date.now()}`,
        firebase_uid: uid,
        email: uid.includes('@') ? uid : `${username}@patterncode.com`,
        display_name: uid.includes('@') ? uid.split('@')[0] : 'Developer User',
        current_streak: 1,
        longest_streak: 1,
        last_solved_at: null,
        is_admin: isAdmin,
        created_at: new Date().toISOString()
      };
      MOCK_STORE.users.push(user);
    }
    return { rows: [user] };
  }

  // 2. INSERT INTO users (firebase_uid, email, display_name)
  if (query.includes('INSERT INTO users')) {
    const uid = params[0];
    const username = uid.split('-')[2] || 'dev';
    const isAdmin = username.toLowerCase().includes('admin') || username.toLowerCase().includes('dev') || username.toLowerCase().includes('googleuser');
    const user = {
      id: `mock-user-${Date.now()}`,
      firebase_uid: params[0],
      email: params[1],
      display_name: params[2],
      current_streak: 0,
      longest_streak: 0,
      last_solved_at: null,
      is_admin: isAdmin,
      created_at: new Date().toISOString()
    };
    MOCK_STORE.users.push(user);
    return { rows: [user] };
  }

  // 3. SELECT * FROM problems WHERE slug = $1
  if (query.includes('FROM problems WHERE slug') || query.includes('problems WHERE slug')) {
    const slug = params[0];
    const foundProblem = MOCK_STORE.problems.find(p => p.slug === slug);
    return { rows: foundProblem ? [foundProblem] : [] };
  }

  // 4. SELECT expected_output FROM test_cases WHERE problem_id = $1 AND input = $2 (run lookup)
  if (query.includes('FROM test_cases WHERE problem_id') && params.length >= 2 && !query.includes('is_sample')) {
    const problemId = params[0];
    const inputFilter = params[1] !== undefined ? String(params[1]).trim() : null;
    const prob = MOCK_STORE.problems.find(p => p.id === problemId);
    const probSlug = prob ? prob.slug : '';
    let testCases = MOCK_STORE.test_cases.filter(tc => tc.problem_slug === probSlug);
    if (inputFilter !== null) {
      testCases = testCases.filter(tc => String(tc.input).trim() === inputFilter);
    }
    return { rows: testCases };
  }

  // 4b. SELECT input, expected_output FROM test_cases WHERE problem_id = $1 (submit / sample lookup)
  if (query.includes('FROM test_cases WHERE problem_id') || query.includes('test_cases WHERE problem_id')) {
    const problemId = params[0];
    const prob = MOCK_STORE.problems.find(p => p.id === problemId);
    const probSlug = prob ? prob.slug : '';
    const testCases = MOCK_STORE.test_cases.filter(tc => tc.problem_slug === probSlug);
    return { rows: testCases };
  }


  // 5. GET Roadmap / Problems List Solved status mapping
  if (query.includes('SELECT p.id, p.title, p.slug, p.category, p.difficulty')) {
    const userId = params[0] || 'mock-user-db-id';

    // Parse category and difficulty filter params from SQL placeholders ($2, $3, etc.)
    let categoryFilter = null;
    let difficultyFilter = null;
    let paramIdx = 2; // params[0] is userId, so filters start at $2

    if (query.includes('AND p.category =')) {
      categoryFilter = params[paramIdx - 1]; // convert $N to 0-based index
      paramIdx++;
    }
    if (query.includes('AND p.difficulty =')) {
      difficultyFilter = params[paramIdx - 1];
      paramIdx++;
    }

    let filteredProblems = MOCK_STORE.problems;
    if (categoryFilter) {
      filteredProblems = filteredProblems.filter(p => p.category === categoryFilter);
    }
    if (difficultyFilter) {
      filteredProblems = filteredProblems.filter(p => p.difficulty === difficultyFilter);
    }

    const problems = filteredProblems.map(p => {
      // Find submission status
      const subs = MOCK_STORE.submissions.filter(s => s.problem_id === p.id && s.user_id === userId);
      const isAccepted = subs.some(s => s.status === 'Accepted');
      const hasOther = subs.some(s => s.status !== 'Accepted');
      return {
        ...p,
        user_status: isAccepted ? 'Accepted' : (hasOther ? 'Attempted' : 'Unsolved')
      };
    });
    return { rows: problems };
  }

  // 6. SELECT COUNT(DISTINCT problem_id) FROM submissions WHERE status = 'Accepted'
  if (query.includes("COUNT(DISTINCT problem_id)") && query.includes("status = 'Accepted'")) {
    const userId = params[0];
    const uniqueSolvedCount = new Set(
      MOCK_STORE.submissions
        .filter(s => s.user_id === userId && s.status === 'Accepted')
        .map(s => s.problem_id)
    ).size;
    return { rows: [{ count: uniqueSolvedCount }] };
  }

  // 7. Solved Category breakdown
  if (query.includes("GROUP BY p.category")) {
    const userId = params[0];
    const solvedSubmissions = MOCK_STORE.submissions.filter(s => s.user_id === userId && s.status === 'Accepted');
    const counts = {};
    solvedSubmissions.forEach(sub => {
      const prob = MOCK_STORE.problems.find(p => p.id === sub.problem_id);
      if (prob) counts[prob.category] = (counts[prob.category] || 0) + 1;
    });
    return { rows: Object.keys(counts).map(cat => ({ category: cat, count: counts[cat] })) };
  }

  // 8. Solved Difficulty breakdown
  if (query.includes("GROUP BY p.difficulty")) {
    const userId = params[0];
    const solvedSubmissions = MOCK_STORE.submissions.filter(s => s.user_id === userId && s.status === 'Accepted');
    const counts = {};
    solvedSubmissions.forEach(sub => {
      const prob = MOCK_STORE.problems.find(p => p.id === sub.problem_id);
      if (prob) counts[prob.difficulty] = (counts[prob.difficulty] || 0) + 1;
    });
    return { rows: Object.keys(counts).map(diff => ({ difficulty: diff, count: counts[diff] })) };
  }

  // 9. Unlocked Badges listing
  if (query.includes("FROM user_badges ub JOIN badges b")) {
    const userId = params[0];
    const uBadges = MOCK_STORE.user_badges.filter(ub => ub.user_id === userId);
    const badges = uBadges.map(ub => {
      const b = MOCK_STORE.badges.find(badge => badge.id === ub.badge_id);
      return { ...b, earned_at: ub.earned_at };
    });
    return { rows: badges.filter(b => b.code !== undefined) };
  }

  // 10. Recent submissions table listing
  if (query.includes("FROM submissions s JOIN problems p")) {
    const userId = params[0];
    const subs = MOCK_STORE.submissions
      .filter(s => s.user_id === userId)
      .map(s => {
        const p = MOCK_STORE.problems.find(prob => prob.id === s.problem_id);
        return {
          id: s.id,
          status: s.status,
          language: s.language,
          created_at: s.created_at,
          title: p ? p.title : 'Deleted Problem',
          slug: p ? p.slug : ''
        };
      })
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5);
    return { rows: subs };
  }

  // 11. SELECT * FROM badges
  if (query.includes("SELECT * FROM badges ORDER BY name")) {
    return { rows: MOCK_STORE.badges };
  }

  // 12. SELECT badge_id FROM user_badges
  if (query.includes("SELECT badge_id FROM user_badges WHERE user_id")) {
    const userId = params[0];
    return { rows: MOCK_STORE.user_badges.filter(ub => ub.user_id === userId).map(ub => ({ badge_id: ub.badge_id })) };
  }

  // 13. UPDATE users SET current_streak
  if (query.includes("UPDATE users SET current_streak") || query.includes("users SET current_streak")) {
    const userId = params[2];
    const user = MOCK_STORE.users.find(u => u.id === userId);
    if (user) {
      user.current_streak = params[0];
      user.longest_streak = params[1];
      user.last_solved_at = new Date().toISOString();
    }
    return { rows: user ? [user] : [] };
  }

  // 14. SELECT current_streak FROM users
  if (query.includes("SELECT current_streak, longest_streak") || query.includes("current_streak, longest_streak")) {
    const userId = params[0];
    const user = MOCK_STORE.users.find(u => u.id === userId || u.firebase_uid === userId);
    return { rows: user ? [user] : [] };
  }

  // 15. INSERT INTO submissions
  if (query.includes("INSERT INTO submissions") || query.includes("submissions (user_id")) {
    const sub = {
      id: `sub-${Date.now()}`,
      user_id: params[0],
      problem_id: params[1],
      status: params[2],
      code: params[3],
      language: params[4],
      execution_time_ms: params[5],
      memory_kb: params[6],
      error_message: params[7],
      created_at: new Date().toISOString()
    };
    MOCK_STORE.submissions.push(sub);
    return { rows: [sub] };
  }

  // 16. INSERT INTO user_badges
  if (query.includes("INSERT INTO user_badges") || query.includes("user_badges (user_id")) {
    const ub = {
      id: `ub-${Date.now()}`,
      user_id: params[0],
      badge_id: params[1],
      earned_at: new Date().toISOString()
    };
    // Check duplication
    const exist = MOCK_STORE.user_badges.some(row => row.user_id === ub.user_id && row.badge_id === ub.badge_id);
    if (!exist) {
      MOCK_STORE.user_badges.push(ub);
    }
    return { rows: [ub] };
  }

  // 17. SELECT NOW() health checks
  if (query.toUpperCase().includes('SELECT NOW()')) {
    return { rows: [{ now: new Date().toISOString() }] };
  }

  // 17b. INSERT INTO problems
  if (query.includes('INSERT INTO problems')) {
    const newProblem = {
      id: `p-uuid-${Date.now()}`,
      title: params[0],
      slug: params[1],
      description: params[2],
      category: params[3],
      difficulty: params[4],
      constraints: typeof params[5] === 'string' ? JSON.parse(params[5]) : params[5],
      input_format: typeof params[6] === 'string' ? JSON.parse(params[6]) : params[6],
      output_format: typeof params[7] === 'string' ? JSON.parse(params[7]) : params[7],
      hints: typeof params[8] === 'string' ? JSON.parse(params[8]) : params[8],
      skeleton_code_json: typeof params[9] === 'string' ? JSON.parse(params[9]) : params[9],
      created_at: new Date().toISOString()
    };
    MOCK_STORE.problems.push(newProblem);
    return { rows: [newProblem] };
  }

  // 17c. INSERT INTO test_cases
  if (query.includes('INSERT INTO test_cases')) {
    const problemId = params[0];
    const problem = MOCK_STORE.problems.find(p => p.id === problemId);
    const slug = problem ? problem.slug : 'unknown';
    
    const newTestCase = {
      id: `tc-uuid-${Date.now()}`,
      problem_slug: slug,
      input: params[1],
      expected_output: params[2],
      is_sample: params[3] === true || params[3] === 'true' || params[3] === 1,
      created_at: new Date().toISOString()
    };
    MOCK_STORE.test_cases.push(newTestCase);
    return { rows: [newTestCase] };
  }

  // 18. Default Fallback
  return { rows: [] };
}

// Intercept pool connections in mock mode
const originalConnect = pool.connect.bind(pool);
pool.connect = function(callback) {
  if (useMockDb) {
    const mockClient = {
      query: async (text, params) => {
        const q = text.trim().toUpperCase();
        if (q === 'BEGIN' || q === 'COMMIT' || q === 'ROLLBACK') {
          return { rows: [] };
        }
        return resolveMockQuery(text, params);
      },
      release: () => {}
    };
    if (callback) {
      callback(null, mockClient, () => {});
      return;
    }
    return Promise.resolve(mockClient);
  }
  return originalConnect(callback);
};

module.exports = {
  query: async (text, params) => {
    if (useMockDb) {
      return resolveMockQuery(text, params);
    }
    try {
      return await pool.query(text, params);
    } catch (e) {
      console.warn('[Database Connection Failed] Query failed. Diverting query to Mock DB:', e.message);
      useMockDb = true;
      return resolveMockQuery(text, params);
    }
  },
  pool,
  MOCK_STORE
};
