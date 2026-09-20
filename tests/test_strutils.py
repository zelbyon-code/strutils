import unittest

from strutils import is_palindrome


class TestIsPalindrome(unittest.TestCase):
    def test_simple_palindrome(self):
        self.assertTrue(is_palindrome("racecar"))

    def test_not_palindrome(self):
        self.assertFalse(is_palindrome("hello"))

    def test_ignores_case_and_spaces(self):
        self.assertTrue(is_palindrome("Never Odd Or Even"))


if __name__ == "__main__":
    unittest.main()
