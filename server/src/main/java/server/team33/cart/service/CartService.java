package server.team33.cart.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.team33.cart.entity.Cart;
import server.team33.cart.entity.ItemCart;
import server.team33.cart.repository.CartRepository;
import server.team33.cart.repository.ItemCartRepository;
import server.team33.exception.bussiness.BusinessLogicException;
import server.team33.exception.bussiness.ExceptionCode;
import server.team33.item.entity.Item;
import server.team33.item.repository.ItemRepository;
import server.team33.user.repository.UserRepository;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ItemCartRepository itemCartRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

//    public Cart addItemCart(ItemCart itemCart) {
//
//        User user = getLoginUser();
//        Cart cart = cartRepository.findByUser(user); // 회원이 카트를 소유하고 있는지 확인
//
//        if(cart == null) {
//            cart = Cart.createCart(user);
//            cartRepository.save(cart);
//        }
//
//        Item item = itemRepository.findByItemId(itemCart.getItem().getItemId());
//        ItemCart findItemCart = itemCartRepository.findByCartAndItem(cart, item); // 장바구니에 이미 있는 상품인지 확인
//
//        if(findItemCart == null) { // 장바구니에 없는 상품을 담는 경우
//            findItemCart =
//        }
//    }

    public void refreshCart(long cartId) {
        Cart cart = findVerifiedCart(cartId);
        // TODO : itemCart 의 변화를 카트에 반영하는 메서드 로직 구현
    }

    public Cart findCart(long cartId) {
        Cart findCart = findVerifiedCart(cartId);
        return findCart;
    }

    public Cart findVerifiedCart(long cartId) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        Cart findCart = optionalCart.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.CART_NOT_FOUND));
        return findCart;
    }
}
