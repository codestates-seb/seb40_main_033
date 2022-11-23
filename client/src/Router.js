import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NormalCart from './pages/NormalCart';
import SubCart from './pages/SubCart';
import Detail from './pages/Detail';
import Home from './pages/Home';
import ItemList from './pages/ItemList';
import LogIn from './pages/LogIn';
import MyPage from './pages/MyPage';
import NotFound from './pages/NotFound';
import Payment from './pages/Payment';
import SearchList from './pages/SearchList';
import SignUp from './pages/SignUp';
import SubPayment from './pages/SubPayment';
import Layout from './components/Layout/Layout';
import NoteReview from './pages/MyPages/NoteReview';
import NoteTalk from './pages/MyPages/NoteTalk';
import OrderDetail from './pages/MyPages/OrderDetail';
import Order from './pages/MyPages/Order';
import UserInfo from './pages/MyPages/UserInfo';
import WishList from './pages/MyPages/WishList';
import SubManage from './pages/MyPages/SubManage';

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="cart/normal" element={<NormalCart />} />
					<Route path="cart/subscription" element={<SubCart />} />
					<Route path="detail/:id" element={<Detail />} />
					<Route path="list" element={<ItemList />} />
					<Route path="login" element={<LogIn />} />
					<Route path="mypage" element={<MyPage />}>
						<Route path="user-info" element={<UserInfo />} />
						<Route path="order" element={<Order />} />
						<Route path="order/:id" element={<OrderDetail />} />
						<Route path="sub-manage" element={<SubManage />} />
						<Route path="wish" element={<WishList />} />
						<Route path="note/review" element={<NoteReview />} />
						<Route path="note/talk" element={<NoteTalk />} />
					</Route>
					<Route path="search" element={<SearchList />} />
					<Route path="signup" element={<SignUp />} />
					<Route path="pay/normal" element={<Payment />} />
					<Route path="pay/subscription" element={<SubPayment />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
