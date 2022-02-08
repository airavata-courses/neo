from unittest import TestCase
import data_viz_engine


class Test(TestCase):

    def setUp_find_url(self):
        self.station = 'KLVX'
        # Year month date hour and minute should be string with fixed width
        self.year = '2016'
        self.month = '11'
        self.date = '11'
        self.hour = '02'
        self.minute = '55'
        # Possible values could be velocity, reflectivity or cross_correlation_ratio
        self.product = 'reflectivity'


    def setUp_fetch_data(self):
        self.station = 'KLVX'
        # Year month date hour and minute should be string with fixed width
        self.year = '2016'
        self.month = '11'
        self.date = '11'
        self.hour = '02'
        self.minute = '55'
        # Possible values could be velocity, reflectivity or cross_correlation_ratio
        self.product = 'reflectivity'
        self.url = data_viz_engine.find_url(self.station, self.year, self.month, self.date, self.hour, self.minute)

    def test_find_url(self):
        self.setUp()
        out = data_viz_engine.find_url(self.station, self.year, self.month, self.date, self.hour, self.minute).filename
        expected = "KLVX20161111_024737_V06"
        self.assert_(expected, out)


    def test_fetch_data(self):
        self.setUp_fetch_data()
        out = data_viz_engine.fetch_data(self.url)



