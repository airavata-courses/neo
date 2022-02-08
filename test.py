from app import app
import unittest


class GatewayTests(unittest.TestCase):

    def test_gateway_status_code(self):
        tester = app.test_client(self)
        response = tester.get('/', content_type='html/text')
        self.assertEqual(response.status_code, 200)

    def test_gateway_start_message(self):
        tester = app.test_client(self)
        response = tester.get('/', content_type='html/text')
        self.assertTrue(b'Gateway Started!' in response.data)


if __name__ == '__main__':
    unittest.main()
