import unittest

from strutils import is_palindrome, word_count


class TestIsPalindrome(unittest.TestCase):
    def test_simple_palindrome(self):
        self.assertTrue(is_palindrome("racecar"))

    def test_not_palindrome(self):
        self.assertFalse(is_palindrome("hello"))

    def test_ignores_case_and_spaces(self):
        self.assertTrue(is_palindrome("Never Odd Or Even"))


class TestWordCount(unittest.TestCase):
    def test_counts_words(self):
        self.assertEqual(word_count("the quick brown fox"), 4)

    def test_empty_string(self):
        self.assertEqual(word_count(""), 0)

    def test_ignores_extra_whitespace(self):
        self.assertEqual(word_count("  hello   world  "), 2)


if __name__ == "__main__":
    unittest.main()
