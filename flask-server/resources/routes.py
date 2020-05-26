from .auth import SignupApi, LoginApi
from .trade import AddTradeApi, TradesApi, PortfolioApi
from .watchlist import Watchlist, AddToWatchlist, RemoveFromWatchlist, CommonDetails
from .search import Search
from .history import History

def initialize_routes(api):
	api.add_resource(SignupApi, '/api/auth/register')
	api.add_resource(LoginApi, '/api/auth/login')

	api.add_resource(AddTradeApi, '/api/add_to_portfolio')
	api.add_resource(TradesApi, '/api/trades')
	api.add_resource(PortfolioApi, '/api/portfolio_overview')

	api.add_resource(Watchlist, '/api/watchlist')
	api.add_resource(AddToWatchlist, '/api/watchlist/add/<code>', '/api/watchlist/add/<code>/<index>')
	api.add_resource(RemoveFromWatchlist, '/api/watchlist/remove/<code>')
	api.add_resource(CommonDetails, '/api/common_details')

	api.add_resource(Search, '/api/search/<searchStr>')

	api.add_resource(History, '/api/hist/<code>', '/api/hist/<code>/<exchange>')