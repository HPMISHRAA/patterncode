-- Insert Badges
INSERT INTO badges (code, name, description, icon_url) VALUES
('first_solved', 'First Pattern Solved', 'Successfully solved your first pattern printing problem!', 'award-first'),
('ten_solved', '10 Patterns Solved', 'Successfully solved 10 pattern printing problems!', 'award-ten'),
('star_master', 'Star Master', 'Solved 5 star pattern problems!', 'star-glow'),
('diamond_master', 'Diamond Master', 'Solved 3 diamond pattern problems!', 'gem'),
('streak_30', '30 Day Streak', 'Maintained a submission streak for 30 consecutive days!', 'flame-badge')
ON CONFLICT (code) DO NOTHING;

-- Insert Problems
-- Problem 1: Right-Angled Triangle
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Right-Angled Triangle',
    'right-angled-triangle',
    'Given an integer N, print a right-angled triangle pattern of stars of height N. The first row contains 1 star, the second contains 2, and so on until the N-th row which contains N stars.',
    'Star Patterns',
    'Easy',
    '{"min_n": 1, "max_n": 20}',
    '{"type": "integer", "description": "A single integer N representing the height of the triangle."}',
    '{"type": "string", "description": "Print the right-angled triangle of stars. Each row of stars should be on a new line."}',
    '["Use a loop to iterate from 1 to N for the rows.", "Inside the outer loop, use an inner loop to print stars.", "In row i, you need to print exactly i stars. Remember to print a new line after each row."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    for i in range(1, n + 1):\n        print(\'*\' * i)\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n        for (int i = 1; i <= n; i++) {\n            for (int j = 1; j <= i; j++) {\n                System.out.print(\"*\");\n            }\n            System.out.println();\n        }\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) {\n            cout << \"*\";\n        }\n        cout << endl;\n    }\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) {\n            printf(\"*\");\n        }\n        printf(\"\\n\");\n    }\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Problem 2: Hollow Square
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Hollow Square',
    'hollow-square',
    'Given an integer N, print a hollow square pattern of stars of size N x N. The border of the square should consist of stars, while the inside should be empty (spaces).',
    'Hollow Patterns',
    'Easy',
    '{"min_n": 2, "max_n": 20}',
    '{"type": "integer", "description": "A single integer N representing the size of the square."}',
    '{"type": "string", "description": "Print the hollow square pattern of stars of size N x N."}',
    '["For rows 1 and N, print N stars.", "For rows in between (2 to N-1), print a star at the first position, N-2 spaces, and a star at the N-th position.", "Use conditional statements inside the nested loops to check if you are on the boundary."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Problem 3: Number Pyramid
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Number Pyramid',
    'number-pyramid',
    'Given an integer N, print a centered pyramid of numbers of height N. The i-th row should be indented with spaces, followed by numbers counting up from 1 to i, and then back down to 1.',
    'Number Patterns',
    'Medium',
    '{"min_n": 1, "max_n": 10}',
    '{"type": "integer", "description": "A single integer N representing the height of the pyramid."}',
    '{"type": "string", "description": "Print the centered number pyramid."}',
    '["For each row i (from 1 to N), print N - i leading spaces first.", "Then, print numbers from 1 to i.", "After reaching i, print numbers decreasing from i - 1 down to 1. Finally, print a new line."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Problem 4: Hollow Diamond
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Hollow Diamond',
    'hollow-diamond',
    'Given an integer N, print a hollow diamond pattern of height 2N - 1. For N = 3, the output will have a maximum width of 5 at the center row.',
    'Diamond Patterns',
    'Hard',
    '{"min_n": 2, "max_n": 15}',
    '{"type": "integer", "description": "A single integer N representing the radius of the diamond."}',
    '{"type": "string", "description": "Print the hollow diamond pattern."}',
    '["Split the drawing logic into the top half (first N rows) and bottom half (next N - 1 rows).", "For each row in the top half, print N - i spaces, a star, then print 2*i - 3 spaces (if i > 1), and another star.", "Mirror this logic for the bottom half of the diamond."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Right-Angled Triangle
-- N = 1 (sample)
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'right-angled-triangle'), '1', '*', TRUE);

-- N = 3 (sample)
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'right-angled-triangle'), '3', '*\n**\n***', TRUE);

-- N = 5 (private)
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'right-angled-triangle'), '5', '*\n**\n***\n****\n*****', FALSE);


-- Seeding Test Cases for Hollow Square
-- N = 2 (sample)
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'hollow-square'), '2', '**\n**', TRUE);

-- N = 4 (sample)
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'hollow-square'), '4', '****\n*  *\n*  *\n****', TRUE);

-- N = 5 (private)
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'hollow-square'), '5', '*****\n*   *\n*   *\n*   *\n*****', FALSE);


-- Seeding Test Cases for Number Pyramid
-- N = 1 (sample)
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'number-pyramid'), '1', '1', TRUE);

-- N = 3 (sample)
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'number-pyramid'), '3', '  1\n 121\n12321', TRUE);

-- N = 5 (private)
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'number-pyramid'), '5', '    1\n   121\n  12321\n 1234321\n123454321', FALSE);


-- Seeding Test Cases for Hollow Diamond
-- N = 2 (sample)
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'hollow-diamond'), '2', ' *\n* *\n *', TRUE);

-- N = 3 (sample)
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'hollow-diamond'), '3', '  *\n * *\n*   *\n * *\n  *', TRUE);

-- N = 4 (private)
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'hollow-diamond'), '4', '   *\n  * *\n *   *\n*     *\n *   *\n  * *\n   *', FALSE);


-- Problem 5: Inverted Right Triangle
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Inverted Right Triangle',
    'inverted-right-triangle',
    'Given an integer N, print a right-angled triangle pointing downwards of height N. The first row contains N stars, the second contains N-1 stars, and so on until the N-th row which contains 1 star.',
    'Star Patterns',
    'Easy',
    '{"min_n": 1, "max_n": 20}',
    '{"type": "integer", "description": "A single integer N representing the height of the triangle."}',
    '{"type": "string", "description": "Print the inverted right-angled triangle of stars."}',
    '["Use a loop to count down from N to 1 or run an outer loop from 1 to N.", "In row i, print N - i + 1 stars.", "Remember to print a new line at the end of each row."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    for i in range(n, 0, -1):\n        print(\'*\' * i)\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Problem 6: Alphabet Triangle
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Alphabet Triangle',
    'alphabet-triangle',
    'Given an integer N, print a triangle of characters of height N. The first row contains ''A'' (1 time), the second row contains ''B'' (2 times), and so on until the N-th row which contains the N-th uppercase alphabet character (N times).',
    'Character Patterns',
    'Medium',
    '{"min_n": 1, "max_n": 26}',
    '{"type": "integer", "description": "A single integer N representing the height of the triangle."}',
    '{"type": "string", "description": "Print the character triangle pattern."}',
    '["Use an outer loop running from 0 to N-1 (or 1 to N).", "To print characters, cast ASCII values: ''A'' has value 65. In row i, print character (char)(65 + i).", "The number of characters in row i is equal to the row index (starting from 1)."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Problem 7: Hollow Triangle
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Hollow Triangle',
    'hollow-triangle',
    'Given an integer N, print a hollow right-angled triangle of height N. The border of the triangle should consist of stars, while the inside should be empty (spaces).',
    'Hollow Patterns',
    'Medium',
    '{"min_n": 2, "max_n": 20}',
    '{"type": "integer", "description": "A single integer N representing the height of the triangle."}',
    '{"type": "string", "description": "Print the hollow right-angled triangle."}',
    '["The first row has 1 star. The last row has N stars.", "For intermediate rows (2 to N-1), print a star at the first and last position, with spaces in between.", "The number of spaces in row i is i - 2."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Problem 8: Star Pyramid
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Star Pyramid',
    'star-pyramid',
    'Given an integer N, print a centered pyramid of stars of height N. Row i should be indented with spaces, followed by stars.',
    'Pyramid Patterns',
    'Medium',
    '{"min_n": 1, "max_n": 15}',
    '{"type": "integer", "description": "A single integer N representing the height of the pyramid."}',
    '{"type": "string", "description": "Print the centered star pyramid."}',
    '["For each row i (from 1 to N), print N - i spaces first.", "Then print 2 * i - 1 stars.", "Remember to print a newline after printing all stars for a row."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Problem 9: Solid Diamond
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Solid Diamond',
    'solid-diamond',
    'Given an integer N, print a centered solid diamond of stars of height 2N-1. The maximum width at the center row is 2N-1 stars.',
    'Diamond Patterns',
    'Hard',
    '{"min_n": 2, "max_n": 15}',
    '{"type": "integer", "description": "A single integer N representing the radius/half-height of the diamond."}',
    '{"type": "string", "description": "Print the centered solid diamond pattern."}',
    '["Split the pattern drawing logic into the top half (including middle row, N rows) and bottom half (N-1 rows).", "For top half row i (1 to N), print N - i spaces, then 2 * i - 1 stars.", "For bottom half row i (1 to N-1), print i spaces, then 2 * (N - i) - 1 stars."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Problem 10: Pascal's Triangle
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Pascal''s Triangle',
    'pascals-triangle',
    'Given an integer N, print the first N rows of Pascal''s Triangle. Each row should contain space-separated integers, representing the coefficients of the binomial expansion. Do not include leading spaces.',
    'Advanced Patterns',
    'Hard',
    '{"min_n": 1, "max_n": 12}',
    '{"type": "integer", "description": "A single integer N representing the number of rows."}',
    '{"type": "string", "description": "Print the first N rows of Pascal''s Triangle with numbers separated by spaces."}',
    '["The value at row i (0-indexed) and column j (0-indexed) is given by the combination formula C(i, j) = i! / (j! * (i-j)!).", "You can calculate values iteratively: value = value * (i - j) / j.", "For each row, print the values separated by spaces. Print a newline at the end of each row."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;


-- Seeding Test Cases for Inverted Right Triangle
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'inverted-right-triangle'), '1', '*', TRUE),
((SELECT id FROM problems WHERE slug = 'inverted-right-triangle'), '3', '***\n**\n*', TRUE),
((SELECT id FROM problems WHERE slug = 'inverted-right-triangle'), '4', '****\n***\n**\n*', FALSE);

-- Seeding Test Cases for Alphabet Triangle
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'alphabet-triangle'), '1', 'A', TRUE),
((SELECT id FROM problems WHERE slug = 'alphabet-triangle'), '3', 'A\nBB\nCCC', TRUE),
((SELECT id FROM problems WHERE slug = 'alphabet-triangle'), '4', 'A\nBB\nCCC\nDDDD', FALSE);

-- Seeding Test Cases for Hollow Triangle
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'hollow-triangle'), '2', '*\n**', TRUE),
((SELECT id FROM problems WHERE slug = 'hollow-triangle'), '4', '*\n**\n* *\n****', TRUE),
((SELECT id FROM problems WHERE slug = 'hollow-triangle'), '5', '*\n**\n* *\n*  *\n*****', FALSE);

-- Seeding Test Cases for Star Pyramid
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'star-pyramid'), '1', '*', TRUE),
((SELECT id FROM problems WHERE slug = 'star-pyramid'), '3', '  *\n ***\n*****', TRUE),
((SELECT id FROM problems WHERE slug = 'star-pyramid'), '4', '   *\n  ***\n *****\n*******', FALSE);

-- Seeding Test Cases for Solid Diamond
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'solid-diamond'), '2', ' *\n***\n *', TRUE),
((SELECT id FROM problems WHERE slug = 'solid-diamond'), '3', '  *\n ***\n*****\n ***\n  *', TRUE),
((SELECT id FROM problems WHERE slug = 'solid-diamond'), '4', '   *\n  ***\n *****\n*******\n *****\n  ***\n   *', FALSE);

-- Seeding Test Cases for Pascal's Triangle
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'pascals-triangle'), '1', '1', TRUE),
((SELECT id FROM problems WHERE slug = 'pascals-triangle'), '3', '1\n1 1\n1 2 1', TRUE),
((SELECT id FROM problems WHERE slug = 'pascals-triangle'), '4', '1\n1 1\n1 2 1\n1 3 3 1', FALSE),
((SELECT id FROM problems WHERE slug = 'pascals-triangle'), '5', '1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1', FALSE);


-- Problem 11: Alphabet Increasing Triangle
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Alphabet Increasing Triangle',
    'alphabet-increasing-triangle',
    'Given an integer N, print a right-angled triangle pattern of letters of height N. Row i contains uppercase letters starting from ''A'' up to the character matching the row index length.',
    'Character Patterns',
    'Easy',
    '{"min_n": 1, "max_n": 26}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the increasing alphabetical triangle."}',
    '["Run a loop from 1 to N for the rows.", "Inside, loop from 0 to i-1 to print characters: ''A'' + j.", "Make sure to print a new line after each row."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    for i in range(1, n + 1):\n        row = \"\".join(chr(65 + j) for j in range(i))\n        print(row)\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Problem 12: Alphabet Decreasing Triangle
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Alphabet Decreasing Triangle',
    'alphabet-decreasing-triangle',
    'Given an integer N, print a right-angled triangle of letters pointing downwards. Row i contains letters from ''A'' up to character N - i + 1.',
    'Character Patterns',
    'Easy',
    '{"min_n": 1, "max_n": 26}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the decreasing alphabet triangle."}',
    '["Run an outer loop to count down from N to 1.", "Inside, print letters from ''A'' up to that length.", "Remember newlines."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Problem 13: Decreasing Number Triangle
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Decreasing Number Triangle',
    'decreasing-number-triangle',
    'Given an integer N, print a downward right-angled triangle of numbers. Row i contains numbers from 1 to N - i + 1.',
    'Number Patterns',
    'Easy',
    '{"min_n": 1, "max_n": 20}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the decreasing number triangle."}',
    '["Outer loop runs N down to 1.", "Inner loop prints digits from 1 up to current outer index.", "Print new line."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Problem 14: Number Pyramid Spaced
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Number Pyramid Spaced',
    'number-pyramid-spaced',
    'Given an integer N, print a centered number pyramid where adjacent numbers in the same row are separated by a single space.',
    'Number Patterns',
    'Medium',
    '{"min_n": 1, "max_n": 15}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the spaced number pyramid."}',
    '["Row i requires N - i leading spaces.", "Print numbers from 1 to i separated by a space character.", "Take care not to print trailing spaces if strictly comparing outputs."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Problem 15: Star Pyramid Spaced
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Star Pyramid Spaced',
    'star-pyramid-spaced',
    'Given an integer N, print a centered star pyramid where adjacent stars in the same row are separated by a single space.',
    'Star Patterns',
    'Medium',
    '{"min_n": 1, "max_n": 20}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the spaced star pyramid."}',
    '["Print N - i spaces at the beginning of row i.", "Then print i stars separated by spaces.", "Make sure there are no trailing spaces on lines if possible."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Problem 16: Alphabet Pyramid Spaced
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Alphabet Pyramid Spaced',
    'alphabet-pyramid-spaced',
    'Given an integer N, print a centered alphabet pyramid where characters in the same row are separated by a single space.',
    'Character Patterns',
    'Medium',
    '{"min_n": 1, "max_n": 26}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the spaced alphabet pyramid."}',
    '["Print N - i spaces.", "Loop j from 0 to i-1 to print character ''A'' + j, followed by a space.", "Print newline."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Problem 17: Mirrored Right Triangle
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Mirrored Right Triangle',
    'mirrored-right-triangle',
    'Given an integer N, print a right-aligned triangle of stars of height N. Row i contains N - i spaces followed by i stars.',
    'Star Patterns',
    'Easy',
    '{"min_n": 1, "max_n": 20}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the right-aligned star triangle."}',
    '["Calculate spaces for row i: N - i.", "Print those spaces, then print i stars.", "Use loops or string multiplication."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    for i in range(1, n + 1):\n        print(\" \" * (n - i) + \"*\" * i)\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Problem 18: Alphabet Mirrored Right Triangle
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Alphabet Mirrored Right Triangle',
    'alphabet-mirrored-right-triangle',
    'Given an integer N, print a right-aligned triangle of letters. Row i contains N - i spaces followed by characters starting from ''A'' up to the row length.',
    'Character Patterns',
    'Medium',
    '{"min_n": 1, "max_n": 26}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the right-aligned alphabetical triangle."}',
    '["Print N - i spaces.", "Then, print letters from ''A'' to ''A'' + i - 1 without spaces.", "Print newline."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Problem 19: Number Hourglass Left
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Number Hourglass Left',
    'number-hourglass-left',
    'Given an integer N, print a left-aligned hourglass shape of numbers. The top half decreases from length N down to 1, and the bottom half increases back to N.',
    'Number Patterns',
    'Medium',
    '{"min_n": 2, "max_n": 15}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the left-aligned number hourglass."}',
    '["The pattern contains 2N - 1 rows.", "Rows 1 to N run with decreasing length: N - row + 1. Print numbers starting from 1.", "Rows N+1 to 2N-1 run with increasing length from 2 to N."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Problem 20: Star Hourglass Spaced
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Star Hourglass Spaced',
    'star-hourglass-spaced',
    'Given an integer N, print a centered hourglass shape of stars of height 2N-1, where stars are separated by single spaces.',
    'Star Patterns',
    'Hard',
    '{"min_n": 2, "max_n": 15}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the spaced star hourglass."}',
    '["For the top half (rows 1 to N), row i has i-1 leading spaces, and N - i + 1 stars separated by spaces.", "For the bottom half (rows N+1 to 2N-1), the row has 2N - 1 - row leading spaces, and row - N + 1 stars separated by spaces."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;


-- Seeding Test Cases for Alphabet Increasing Triangle
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'alphabet-increasing-triangle'), '1', 'A', TRUE),
((SELECT id FROM problems WHERE slug = 'alphabet-increasing-triangle'), '3', 'A\nAB\nABC', TRUE),
((SELECT id FROM problems WHERE slug = 'alphabet-increasing-triangle'), '4', 'A\nAB\nABC\nABCD', FALSE);

-- Seeding Test Cases for Alphabet Decreasing Triangle
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'alphabet-decreasing-triangle'), '1', 'A', TRUE),
((SELECT id FROM problems WHERE slug = 'alphabet-decreasing-triangle'), '3', 'ABC\nAB\nA', TRUE),
((SELECT id FROM problems WHERE slug = 'alphabet-decreasing-triangle'), '4', 'ABCD\nABC\nAB\nA', FALSE);

-- Seeding Test Cases for Decreasing Number Triangle
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'decreasing-number-triangle'), '1', '1', TRUE),
((SELECT id FROM problems WHERE slug = 'decreasing-number-triangle'), '3', '123\n12\n1', TRUE),
((SELECT id FROM problems WHERE slug = 'decreasing-number-triangle'), '4', '1234\n123\n12\n1', FALSE);

-- Seeding Test Cases for Number Pyramid Spaced
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'number-pyramid-spaced'), '1', '1', TRUE),
((SELECT id FROM problems WHERE slug = 'number-pyramid-spaced'), '3', '  1\n 1 2\n1 2 3', TRUE),
((SELECT id FROM problems WHERE slug = 'number-pyramid-spaced'), '4', '   1\n  1 2\n 1 2 3\n1 2 3 4', FALSE);

-- Seeding Test Cases for Star Pyramid Spaced
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'star-pyramid-spaced'), '1', '*', TRUE),
((SELECT id FROM problems WHERE slug = 'star-pyramid-spaced'), '3', '  *\n * *\n* * *', TRUE),
((SELECT id FROM problems WHERE slug = 'star-pyramid-spaced'), '4', '   *\n  * *\n * * *\n* * * *', FALSE);

-- Seeding Test Cases for Alphabet Pyramid Spaced
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'alphabet-pyramid-spaced'), '1', 'A', TRUE),
((SELECT id FROM problems WHERE slug = 'alphabet-pyramid-spaced'), '3', '  A\n A B\nA B C', TRUE),
((SELECT id FROM problems WHERE slug = 'alphabet-pyramid-spaced'), '4', '   A\n  A B\n A B C\nA B C D', FALSE);

-- Seeding Test Cases for Mirrored Right Triangle
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'mirrored-right-triangle'), '1', '*', TRUE),
((SELECT id FROM problems WHERE slug = 'mirrored-right-triangle'), '3', '  *\n **\n***', TRUE),
((SELECT id FROM problems WHERE slug = 'mirrored-right-triangle'), '4', '   *\n  **\n ***\n****', FALSE);

-- Seeding Test Cases for Alphabet Mirrored Right Triangle
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'alphabet-mirrored-right-triangle'), '1', 'A', TRUE),
((SELECT id FROM problems WHERE slug = 'alphabet-mirrored-right-triangle'), '3', '  A\n AB\nABC', TRUE),
((SELECT id FROM problems WHERE slug = 'alphabet-mirrored-right-triangle'), '4', '   A\n  AB\n ABC\nABCD', FALSE);

-- Seeding Test Cases for Number Hourglass Left
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'number-hourglass-left'), '2', '12\n1\n12', TRUE),
((SELECT id FROM problems WHERE slug = 'number-hourglass-left'), '3', '123\n12\n1\n12\n123', TRUE),
((SELECT id FROM problems WHERE slug = 'number-hourglass-left'), '4', '1234\n123\n12\n1\n12\n123\n1234', FALSE);

-- Seeding Test Cases for Star Hourglass Spaced
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'star-hourglass-spaced'), '2', '* *\n *\n* *', TRUE),
((SELECT id FROM problems WHERE slug = 'star-hourglass-spaced'), '3', '* * *\n * *\n  *\n * *\n* * *', TRUE),
((SELECT id FROM problems WHERE slug = 'star-hourglass-spaced'), '4', '* * * *\n * * *\n  * *\n   *\n  * *\n * * *\n* * * *', FALSE);



-- Added from Sheet 2 via automated agent script

-- Problem: Number Increasing Pyramid
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Number Increasing Pyramid',
    'number-increasing-pyramid',
    'Given an integer N, print a left-aligned triangle pattern of numbers of height N. The first row contains \"1\", the second row contains \"1 2\", and the i-th row contains numbers from 1 to i separated by a single space.',
    'Number Patterns',
    'Easy',
    '{"min_n": 1, "max_n": 20}',
    '{"type": "integer", "description": "A single integer N representing the height of the pattern."}',
    '{"type": "string", "description": "Print the number increasing pyramid pattern."}',
    '["Use a loop to iterate through each row from 1 to N.", "In row i, use an inner loop or utility to print numbers from 1 to i separated by a space.", "Ensure there are no trailing spaces at the end of each row."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Number Increasing Pyramid
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'number-increasing-pyramid'), '1', '1', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'number-increasing-pyramid'), '3', '1\n1 2\n1 2 3', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'number-increasing-pyramid'), '5', '1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5', FALSE);

-- Problem: Number Changing Pyramid
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Number Changing Pyramid',
    'number-changing-pyramid',
    'Given an integer N, print a left-aligned triangle pattern of numbers of height N where the numbers increment sequentially starting from 1. Adjacent numbers in the same row should be separated by a single space.',
    'Number Patterns',
    'Easy',
    '{"min_n": 1, "max_n": 15}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the number changing pyramid pattern."}',
    '["Keep a counter variable initialized to 1.", "For each row i from 1 to N, print i numbers, incrementing the counter each time.", "Separate numbers in a row by a single space."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Number Changing Pyramid
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'number-changing-pyramid'), '1', '1', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'number-changing-pyramid'), '3', '1\n2 3\n4 5 6', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'number-changing-pyramid'), '5', '1\n2 3\n4 5 6\n7 8 9 10\n11 12 13 14 15', FALSE);

-- Problem: Zero-One Triangle
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Zero-One Triangle',
    'zero-one-triangle',
    'Given an integer N, print a right-angled triangle of height N containing alternating 1s and 0s. The first element of row i is 1 if i is odd, and 0 if i is even, with alternating values following in that row separated by a single space.',
    'Number Patterns',
    'Medium',
    '{"min_n": 1, "max_n": 20}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the zero-one triangle pattern."}',
    '["Use nested loops where row i runs from 1 to N and column j runs from 1 to i.", "The value at row i and column j is 1 if (i + j) is even, and 0 if (i + j) is odd.", "Remember to print spaces between the values in each row."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Zero-One Triangle
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'zero-one-triangle'), '1', '1', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'zero-one-triangle'), '3', '1\n0 1\n1 0 1', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'zero-one-triangle'), '5', '1\n0 1\n1 0 1\n0 1 0 1\n1 0 1 0 1', FALSE);

-- Problem: Rhombus Pattern
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Rhombus Pattern',
    'rhombus-pattern',
    'Given an integer N, print a rhombus pattern of stars of size N x N. The row i (0-indexed) should start with i spaces followed by N stars.',
    'Star Patterns',
    'Easy',
    '{"min_n": 1, "max_n": 20}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the rhombus pattern of stars."}',
    '["For each row i from 0 to N - 1, print i leading spaces.", "Follow the spaces with N stars.", "No spaces are needed between the stars in this pattern."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Rhombus Pattern
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'rhombus-pattern'), '1', '*', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'rhombus-pattern'), '3', '***\n ***\n  ***', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'rhombus-pattern'), '5', '*****\n *****\n  *****\n   *****\n    *****', FALSE);

-- Problem: Butterfly Star Pattern
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Butterfly Star Pattern',
    'butterfly-star-pattern',
    'Given an integer N, print a butterfly star pattern of height 2N - 1. The wings of the butterfly are made of stars with spaces in the center.',
    'Star Patterns',
    'Medium',
    '{"min_n": 2, "max_n": 15}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the butterfly star pattern."}',
    '["Divide the pattern into a top half of N rows and a bottom half of N - 1 rows.", "For the top half row i (1 to N), print i stars, 2 * (N - i) spaces, and i stars.", "For the bottom half row i (N - 1 down to 1), mirror the top half logic."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Butterfly Star Pattern
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'butterfly-star-pattern'), '2', '*  *\n****\n*  *', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'butterfly-star-pattern'), '3', '*    *\n**  **\n******\n**  **\n*    *', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'butterfly-star-pattern'), '4', '*      *\n**    **\n***  ***\n********\n***  ***\n**    **\n*      *', FALSE);

-- Problem: Square Fill Pattern
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Square Fill Pattern',
    'square-fill-pattern',
    'Given an integer N, print a solid N x N square pattern of stars.',
    'Star Patterns',
    'Easy',
    '{"min_n": 1, "max_n": 20}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the solid N x N square of stars."}',
    '["Use nested loops to iterate through N rows and N columns.", "Print a star for every cell in the grid.", "Do not print spaces between stars in the same row."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Square Fill Pattern
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'square-fill-pattern'), '1', '*', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'square-fill-pattern'), '3', '***\n***\n***', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'square-fill-pattern'), '5', '*****\n*****\n*****\n*****\n*****', FALSE);

-- Problem: Reverse Left Half Pyramid
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Reverse Left Half Pyramid',
    'reverse-left-half-pyramid',
    'Given an integer N, print a right-aligned inverted triangle of stars. The first row contains N stars, the second row contains N - 1 stars preceded by 1 space, and the N-th row contains 1 star preceded by N - 1 spaces.',
    'Star Patterns',
    'Easy',
    '{"min_n": 1, "max_n": 20}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the reverse left half pyramid."}',
    '["For each row i from 0 to N - 1, print i leading spaces.", "Follow the spaces by printing N - i stars.", "Do not print spaces between the stars."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Reverse Left Half Pyramid
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'reverse-left-half-pyramid'), '1', '*', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'reverse-left-half-pyramid'), '3', '***\n **\n  *', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'reverse-left-half-pyramid'), '5', '*****\n ****\n  ***\n   **\n    *', FALSE);

-- Problem: K Star Pattern
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'K Star Pattern',
    'k-star-pattern',
    'Given an integer N, print a K-shaped star pattern of height 2N - 1. The top half decreases from N stars down to 1 star, and the bottom half increases back to N stars. Stars in each row should be separated by a single space.',
    'Star Patterns',
    'Medium',
    '{"min_n": 2, "max_n": 20}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the K star pattern."}',
    '["The pattern has 2N - 1 rows.", "The first N rows print stars counting down from N to 1, separated by spaces.", "The remaining N - 1 rows print stars counting up from 2 to N, separated by spaces."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for K Star Pattern
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'k-star-pattern'), '2', '* *\n*\n* *', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'k-star-pattern'), '3', '* * *\n* *\n*\n* *\n* * *', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'k-star-pattern'), '4', '* * * *\n* * *\n* *\n*\n* *\n* * *\n* * * *', FALSE);

-- Problem: Reverse Number Triangle Pattern
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Reverse Number Triangle Pattern',
    'reverse-number-triangle-pattern',
    'Given an integer N, print an inverted right triangle of numbers where each row i (1-indexed) has i-1 leading spaces and prints numbers from i to N separated by a single space.',
    'Number Patterns',
    'Medium',
    '{"min_n": 1, "max_n": 15}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the reverse number triangle pattern."}',
    '["For row i from 1 to N, print i - 1 leading spaces.", "Then print numbers starting from i up to N, separated by a single space.", "Use a loop or array join to construct the row."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Reverse Number Triangle Pattern
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'reverse-number-triangle-pattern'), '1', '1', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'reverse-number-triangle-pattern'), '3', '1 2 3\n 2 3\n  3', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'reverse-number-triangle-pattern'), '4', '1 2 3 4\n 2 3 4\n  3 4\n   4', FALSE);

-- Problem: Mirror Image Triangle Pattern
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Mirror Image Triangle Pattern',
    'mirror-image-triangle-pattern',
    'Given an integer N, print an hourglass pattern of numbers of height 2N - 1. The top half has row i (1-indexed) with i-1 leading spaces and numbers from i to N separated by a space. The bottom half mirrors this in reverse.',
    'Number Patterns',
    'Hard',
    '{"min_n": 2, "max_n": 15}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the mirror image triangle pattern."}',
    '["This pattern is an hourglass of numbers composed of 2N - 1 rows.", "The top N rows decrease in width: row i has i-1 leading spaces and numbers from i to N.", "The bottom N-1 rows increase in width: row i (counting down from N to 1) has i-1 leading spaces and numbers from i to N."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Mirror Image Triangle Pattern
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'mirror-image-triangle-pattern'), '2', '1 2\n 2\n 2\n1 2', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'mirror-image-triangle-pattern'), '3', '1 2 3\n 2 3\n  3\n  3\n 2 3\n1 2 3', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'mirror-image-triangle-pattern'), '4', '1 2 3 4\n 2 3 4\n  3 4\n   4\n   4\n  3 4\n 2 3 4\n1 2 3 4', FALSE);

-- Problem: Hollow Triangle Pattern
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Hollow Triangle Pattern',
    'hollow-triangle-pattern',
    'Given an integer N, print a hollow centered triangle pattern of height N. The first row has a single star centered at position N. The N-th row has 2N - 1 stars. The rows in between have stars only at the boundaries.',
    'Hollow Patterns',
    'Medium',
    '{"min_n": 2, "max_n": 15}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the hollow triangle pattern of stars."}',
    '["Row i (1 to N) requires N - i leading spaces.", "If i is 1, print a single star.", "If i is N, print 2 * N - 1 stars.", "For intermediate rows, print a star, followed by 2 * i - 3 spaces, followed by another star."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Hollow Triangle Pattern
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'hollow-triangle-pattern'), '2', ' *\n***', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'hollow-triangle-pattern'), '3', '  *\n * *\n*****', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'hollow-triangle-pattern'), '5', '    *\n   * *\n  *   *\n *     *\n*********', FALSE);

-- Problem: Hollow Reverse Triangle Pattern
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Hollow Reverse Triangle Pattern',
    'hollow-reverse-triangle-pattern',
    'Given an integer N, print an inverted hollow centered triangle pattern of height N.',
    'Hollow Patterns',
    'Medium',
    '{"min_n": 2, "max_n": 15}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the hollow reverse triangle pattern."}',
    '["This is the vertical mirror image of the hollow triangle pattern.", "Row 1 (the widest row) contains 2 * N - 1 stars.", "Row i (from 2 to N - 1) has i - 1 leading spaces, a star, 2 * (N - i) - 1 spaces, and another star.", "Row N has N - 1 leading spaces and a single star."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Hollow Reverse Triangle Pattern
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'hollow-reverse-triangle-pattern'), '2', '***\n *', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'hollow-reverse-triangle-pattern'), '3', '*****\n * *\n  *', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'hollow-reverse-triangle-pattern'), '5', '*********\n *     *\n  *   *\n   * *\n    *', FALSE);

-- Problem: Hollow Hourglass Pattern
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Hollow Hourglass Pattern',
    'hollow-hourglass-pattern',
    'Given an integer N, print a hollow hourglass pattern of stars of height 2N - 1. The top and bottom rows contain N stars separated by a single space. The middle row (row N) has N - 1 spaces followed by 1 star. Intermediate rows are hollow.',
    'Hollow Patterns',
    'Hard',
    '{"min_n": 2, "max_n": 15}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the hollow hourglass pattern."}',
    '["The pattern has 2N - 1 rows and a central row N.", "Row 1 and row 2N - 1 print N stars separated by spaces.", "For row i (2 to N - 1) in the top half, print i - 1 leading spaces, a star, 2 * (N - i) - 1 spaces, and a star.", "The bottom half mirrors the top half."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Hollow Hourglass Pattern
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'hollow-hourglass-pattern'), '2', '* *\n *\n* *', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'hollow-hourglass-pattern'), '3', '* * *\n * *\n  *\n * *\n* * *', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'hollow-hourglass-pattern'), '4', '* * * *\n *   *\n  * *\n   *\n  * *\n *   *\n* * * *', FALSE);

-- Problem: Right Pascal's Triangle
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Right Pascal''s Triangle',
    'right-pascals-triangle',
    'Given an integer N, print a left-aligned half-diamond pattern of stars of height 2N - 1. The first row contains 1 star, the N-th row contains N stars, and the last row contains 1 star.',
    'Star Patterns',
    'Easy',
    '{"min_n": 1, "max_n": 20}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the right Pascal\'\'s triangle of stars."}',
    '["The pattern consists of 2N - 1 rows.", "The first N rows print stars incrementing from 1 to N.", "The remaining N - 1 rows print stars decrementing from N - 1 down to 1."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Right Pascal's Triangle
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'right-pascals-triangle'), '1', '*', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'right-pascals-triangle'), '3', '*\n**\n***\n**\n*', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'right-pascals-triangle'), '5', '*\n**\n***\n****\n*****\n****\n***\n**\n*', FALSE);



-- Added from Cross or X sheet via automated agent script

-- Problem: Cross or X Star Pattern
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Cross or X Star Pattern',
    'cross-star-pattern',
    'Given an integer N, print a cross (X) pattern of stars of height 2N - 1. Each row index r (0-indexed) has stars at index r and (2N - 2 - r).',
    'Star Patterns',
    'Medium',
    '{"min_n": 1, "max_n": 20}',
    '{"type": "integer", "description": "A single integer N representing the half height."}',
    '{"type": "string", "description": "Print the cross star pattern."}',
    '["The pattern has size = 2 * N - 1 rows and columns.", "For each row r from 0 to size - 1, print stars at column index r and size - 1 - r, and spaces elsewhere.", "Strip trailing whitespaces from each line."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Cross or X Star Pattern
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'cross-star-pattern'), '1', '*', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'cross-star-pattern'), '3', '*   *\n * *\n  *\n * *\n*   *', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'cross-star-pattern'), '4', '*     *\n *   *\n  * *\n   *\n  * *\n *   *\n*     *', FALSE);

-- Problem: Cross or X Number Pattern
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Cross or X Number Pattern',
    'cross-number-pattern',
    'Given an integer N, print a cross (X) pattern of numbers of height 2N - 1. Row r (0-indexed) prints the number r + 1 at the column indices r and (2N - 2 - r).',
    'Number Patterns',
    'Medium',
    '{"min_n": 1, "max_n": 15}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the cross number pattern."}',
    '["The pattern has size = 2 * N - 1 rows.", "For each row r, print the string representation of r + 1 at column index r and size - 1 - r.", "Do not print trailing spaces."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Cross or X Number Pattern
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'cross-number-pattern'), '1', '1', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'cross-number-pattern'), '3', '1   1\n 2 2\n  3\n 4 4\n5   5', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'cross-number-pattern'), '4', '1     1\n 2   2\n  3 3\n   4\n  5 5\n 6   6\n7     7', FALSE);

-- Problem: Cross or X Character Pattern
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Cross or X Character Pattern',
    'cross-character-pattern',
    'Given an integer N, print a cross (X) pattern of characters of height 2N - 1. Row r (0-indexed) prints the character matching ''''A'''' + r at the column indices r and (2N - 2 - r).',
    'Character Patterns',
    'Medium',
    '{"min_n": 1, "max_n": 15}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the cross character pattern."}',
    '["The pattern size is 2 * N - 1.", "Convert index r to uppercase alphabet character: A + r.", "Print this character at positions where column c equals r or size - 1 - r."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Cross or X Character Pattern
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'cross-character-pattern'), '1', 'A', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'cross-character-pattern'), '3', 'A   A\n B B\n  C\n D D\nE   E', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'cross-character-pattern'), '4', 'A     A\n B   B\n  C C\n   D\n  E E\n F   F\nG     G', FALSE);



-- Added from Pyramid reference sheet via automated agent script

-- Problem: Inverted Full Pyramid
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Inverted Full Pyramid',
    'inverted-full-pyramid',
    'Given an integer N, print a centered inverted pyramid of stars of height N. The first row contains 2N - 1 stars, the second row contains 2N - 3 stars preceded by 1 space, and the N-th row contains 1 star preceded by N - 1 spaces.',
    'Star Patterns',
    'Medium',
    '{"min_n": 1, "max_n": 15}',
    '{"type": "integer", "description": "A single integer N representing the height of the pyramid."}',
    '{"type": "string", "description": "Print the centered inverted pyramid of stars."}',
    '["Use an outer loop to iterate from 0 to N - 1.", "For row i, print i leading spaces.", "Then print 2 * (N - i) - 1 stars.", "Do not print spaces between adjacent stars in the same row."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Inverted Full Pyramid
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'inverted-full-pyramid'), '1', '*', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'inverted-full-pyramid'), '3', '*****\n ***\n  *', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'inverted-full-pyramid'), '4', '*******\n *****\n  ***\n   *', FALSE);

-- Problem: Rhombus Pyramid
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Rhombus Pyramid',
    'rhombus-pyramid',
    'Given an integer N, print a rhombus pattern of stars of size N x N slanted to the left. The row i (0-indexed) starts with N - 1 - i spaces followed by N stars.',
    'Star Patterns',
    'Easy',
    '{"min_n": 1, "max_n": 20}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the left-slanted rhombus pattern of stars."}',
    '["For each row i from 0 to N - 1, print N - 1 - i leading spaces.", "Follow the spaces by printing N stars.", "No spaces are needed between the stars in this pattern."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Rhombus Pyramid
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'rhombus-pyramid'), '1', '*', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'rhombus-pyramid'), '3', '  ***\n ***\n***', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'rhombus-pyramid'), '4', '   ****\n  ****\n ****\n****', FALSE);

-- Problem: Hourglass Pyramid
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Hourglass Pyramid',
    'hourglass-pyramid',
    'Given an integer N, print a centered solid hourglass pattern of stars of height 2N - 1. The top and bottom rows contain 2N - 1 stars, the middle row contains 1 star, and the intermediate rows are solid.',
    'Star Patterns',
    'Hard',
    '{"min_n": 2, "max_n": 15}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the centered solid hourglass star pattern."}',
    '["The pattern has 2N - 1 rows and a central row N.", "The top half is an inverted full pyramid of height N.", "The bottom half is a centered full pyramid of height N - 1.", "Ensure stars are printed contiguously without spaces in each row."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Hourglass Pyramid
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'hourglass-pyramid'), '2', '***\n *\n***', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'hourglass-pyramid'), '3', '*****\n ***\n  *\n ***\n*****', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'hourglass-pyramid'), '4', '*******\n *****\n  ***\n   *\n  ***\n *****\n*******', FALSE);

-- Problem: Concentric Number Square
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Concentric Number Square',
    'concentric-number-square',
    'Given an integer N, print a concentric square pattern of numbers of size (2N - 1) x (2N - 1). The outermost border consists of the number N, the next inner border consists of N - 1, and so on, down to 1 in the center. The numbers in each row should be separated by a single space.',
    'Number Patterns',
    'Medium',
    '{"min_n": 1, "max_n": 10}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the concentric square pattern of numbers."}',
    '["The size of the output matrix is (2N - 1) x (2N - 1).", "For cell (r, c) (0-indexed), the value depends on the minimum distance to the top, bottom, left, and right boundaries.", "The minimum distance is min(r, c, (2N - 2 - r), (2N - 2 - c)).", "The value at (r, c) is calculated as N - min_distance.", "Print the numbers in each row separated by spaces. Ensure you do not leave trailing spaces."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Concentric Number Square
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'concentric-number-square'), '1', '1', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'concentric-number-square'), '3', '3 3 3 3 3\n3 2 2 2 3\n3 2 1 2 3\n3 2 2 2 3\n3 3 3 3 3', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'concentric-number-square'), '4', '4 4 4 4 4 4 4\n4 3 3 3 3 3 4\n4 3 2 2 2 3 4\n4 3 2 1 2 3 4\n4 3 2 2 2 3 4\n4 3 3 3 3 3 4\n4 4 4 4 4 4 4', FALSE);

-- Problem: Left Pascal's Triangle
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Left Pascal''s Triangle',
    'left-pascals-triangle',
    'Given an integer N, print a left-pointing half-diamond pattern of stars. The pattern consists of 2N - 1 rows. The first row has N - 1 spaces followed by 1 star, the N-th row has 0 spaces followed by N stars, and the (2N - 1)-th row has N - 1 spaces followed by 1 star.',
    'Star Patterns',
    'Easy',
    '{"min_n": 1, "max_n": 20}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the left-pointing half-diamond pattern of stars."}',
    '["The pattern consists of 2N - 1 rows.", "For row r from 0 to 2N - 2, let distance d = abs(N - 1 - r).", "Print d leading spaces followed by N - d stars.", "Do not print spaces between stars in this pattern."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Left Pascal's Triangle
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'left-pascals-triangle'), '1', '*', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'left-pascals-triangle'), '3', '  *\n **\n***\n **\n  *', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'left-pascals-triangle'), '4', '   *\n  **\n ***\n****\n ***\n  **\n   *', FALSE);

-- Problem: Heart Star Pattern
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Heart Star Pattern',
    'heart-star-pattern',
    'Given an even integer N, print a heart shape of stars. The width of the heart will align with the output for height (which consists of top lobes and a descending bottom cone).',
    'Star Patterns',
    'Medium',
    '{"min_n": 4, "max_n": 20}',
    '{"type": "integer", "description": "A single even integer N."}',
    '{"type": "string", "description": "Print the heart star pattern."}',
    '["The input N is assumed to be even. The pattern is split into a top part and a bottom part.", "For top part, let row i run from N/2 to N with step 2. Row i has (N - i)/2 spaces, i stars, (N - i) spaces, and i stars.", "For bottom part, let row i run from N down to 1 with step 1. Row i has (N - i) spaces followed by 2*i - 1 stars."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Heart Star Pattern
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'heart-star-pattern'), '4', ' *   *\n*** ***\n*******\n *****\n  ***\n   *', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'heart-star-pattern'), '6', ' ***   ***\n***** *****\n***********\n *********\n  *******\n   *****\n    ***\n     *', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'heart-star-pattern'), '8', '  ****    ****\n ******  ******\n***************\n *************\n  ***********\n   *********\n    *******\n     *****\n      ***\n       *', FALSE);

-- Problem: Alphabet Hourglass Pattern
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Alphabet Hourglass Pattern',
    'alphabet-hourglass-pattern',
    'Given an integer N, print a centered hourglass shape of uppercase letters. The letters in each row are separated by a single space, and the character printed changes from ''A'' at the outer rows to the N-th alphabet at the center row.',
    'Character Patterns',
    'Medium',
    '{"min_n": 1, "max_n": 26}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the centered alphabet hourglass."}',
    '["The pattern has 2N - 1 rows.", "For row r from 0 to 2N - 2, let d = abs(N - 1 - r).", "Row r has N - 1 - d leading spaces, followed by d + 1 characters separated by single spaces.", "The character printed is (char)(''A'' + (N - 1 - d))."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Alphabet Hourglass Pattern
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'alphabet-hourglass-pattern'), '1', 'A', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'alphabet-hourglass-pattern'), '3', 'A A A\n B B\n  C\n B B\nA A A', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'alphabet-hourglass-pattern'), '4', 'A A A A\n B B B\n  C C\n   D\n  C C\n B B B\nA A A A', FALSE);

-- Problem: Hollow Diamond of Numbers
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Hollow Diamond of Numbers',
    'hollow-diamond-numbers',
    'Given an integer N, print a hollow diamond shape of numbers of height 2N - 1. The numbers on row i match the row index level (1-indexed from top/bottom). The inside is empty.',
    'Diamond Patterns',
    'Hard',
    '{"min_n": 2, "max_n": 15}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the hollow diamond pattern of numbers."}',
    '["The pattern has 2N - 1 rows.", "For row r from 0 to 2N - 2, let d = abs(N - 1 - r). The row prints value = N - d.", "If d == N - 1, print d spaces followed by value.", "Otherwise, print d spaces, value, 2 * (N - 1 - d) - 1 spaces, and value again."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == \'__main__\':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

-- Seeding Test Cases for Hollow Diamond of Numbers
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'hollow-diamond-numbers'), '2', ' 1\n2 2\n 1', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'hollow-diamond-numbers'), '3', '  1\n 2 2\n3   3\n 2 2\n  1', TRUE);
INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'hollow-diamond-numbers'), '4', '   1\n  2 2\n 3   3\n4     4\n 3   3\n  2 2\n   1', FALSE);


-- Problem 46: Solid Square Star
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Solid Square Star',
    'solid-square-star',
    'Given an integer N, print a solid filled square of stars of size N x N. Every row contains exactly N stars with no spaces.',
    'Star Patterns',
    'Easy',
    '{"min_n": 1, "max_n": 20}',
    '{"type": "integer", "description": "A single integer N representing the side length of the square."}',
    '{"type": "string", "description": "Print an N x N square of stars, one row per line."}',
    '["Use an outer loop to iterate N times (for each row).", "Inside the outer loop, use an inner loop that runs N times to print N stars.", "Print a newline after each row."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == ''__main__'':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'solid-square-star'), '1', '*', TRUE),
((SELECT id FROM problems WHERE slug = 'solid-square-star'), '3', '***\n***\n***', TRUE),
((SELECT id FROM problems WHERE slug = 'solid-square-star'), '5', '*****\n*****\n*****\n*****\n*****', FALSE);


-- Problem 47: Number Crown
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Number Crown',
    'number-crown',
    'Given an integer N, print a number crown pattern of height N. Row i (1-indexed) contains numbers 1 to i, then 2*(N-i) spaces, then numbers i down to 1.',
    'Number Patterns',
    'Medium',
    '{"min_n": 1, "max_n": 10}',
    '{"type": "integer", "description": "A single integer N representing the height of the crown."}',
    '{"type": "string", "description": "Print the number crown pattern."}',
    '["For each row i (1 to N), print numbers from 1 to i.", "Then print 2*(N - i) spaces in the middle.", "Then print numbers from i down to 1.", "For the last row (i = N), there are no spaces in the middle."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == ''__main__'':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'number-crown'), '1', '1', TRUE),
((SELECT id FROM problems WHERE slug = 'number-crown'), '3', '1    1\n12  21\n123321', TRUE),
((SELECT id FROM problems WHERE slug = 'number-crown'), '4', '1      1\n12    21\n123  321\n12344321', FALSE);


-- Problem 48: Alpha-Hill
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Alpha-Hill',
    'alpha-hill',
    'Given an integer N, print a centered alphabetical hill pattern of height N. Row i (1-indexed) has N-i leading spaces, then characters from ''A'' to the i-th letter, then back down from the (i-1)-th letter to ''A''.',
    'Character Patterns',
    'Medium',
    '{"min_n": 1, "max_n": 13}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the centered alpha-hill pattern."}',
    '["For row i (1 to N), print N - i leading spaces.", "Then print characters A, B, ..., up to A + i - 1.", "Then print characters back from A + i - 2 down to A.", "For i = 1, only A is printed."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == ''__main__'':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'alpha-hill'), '1', 'A', TRUE),
((SELECT id FROM problems WHERE slug = 'alpha-hill'), '3', '  A\n ABA\nABCBA', TRUE),
((SELECT id FROM problems WHERE slug = 'alpha-hill'), '5', '    A\n   ABA\n  ABCBA\n ABCDCBA\nABCDEDCBA', FALSE);


-- Problem 49: Symmetric Void
INSERT INTO problems (title, slug, description, category, difficulty, constraints, input_format, output_format, hints, skeleton_code_json) VALUES
(
    'Symmetric Void',
    'symmetric-void',
    'Given an integer N, print a symmetric void (double triangle) pattern of height 2N. The top half has rows with decreasing stars, increasing void, and decreasing stars. The bottom half mirrors the top.',
    'Star Patterns',
    'Hard',
    '{"min_n": 2, "max_n": 10}',
    '{"type": "integer", "description": "A single integer N."}',
    '{"type": "string", "description": "Print the symmetric void pattern."}',
    '["The pattern has 2N rows total.", "For the top half, row i (0-indexed from 0 to N-1): print N-i stars, then 2*i spaces, then N-i stars.", "For the bottom half, row i (0-indexed from 0 to N-1): print i+1 stars, then 2*(N-1-i) spaces, then i+1 stars.", "Stars within each wing are printed without spaces between them."]',
    '{
        "python": "def print_pattern(n):\n    # Write your code here\n    pass\n\nif __name__ == ''__main__'':\n    n = int(input().strip())\n    print_pattern(n)",
        "java": "import java.util.Scanner;\n\npublic class Solution {\n    public static void printPattern(int n) {\n        // Write your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            printPattern(n);\n        }\n    }\n}",
        "cpp": "#include <iostream>\nusing namespace std;\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        printPattern(n);\n    }\n    return 0;\n}",
        "c": "#include <stdio.h>\n\nvoid printPattern(int n) {\n    // Write your code here\n}\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printPattern(n);\n    }\n    return 0;\n}"
    }'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES
((SELECT id FROM problems WHERE slug = 'symmetric-void'), '2', '**  **\n*    *\n*    *\n**  **', TRUE),
((SELECT id FROM problems WHERE slug = 'symmetric-void'), '3', '***    ***\n**      **\n*        *\n*        *\n**      **\n***    ***', TRUE),
((SELECT id FROM problems WHERE slug = 'symmetric-void'), '4', '****      ****\n***        ***\n**          **\n*            *\n*            *\n**          **\n***        ***\n****      ****', FALSE);



