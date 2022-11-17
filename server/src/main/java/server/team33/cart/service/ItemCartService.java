package server.team33.cart.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.team33.cart.entity.Cart;
import server.team33.cart.entity.ItemCart;
import server.team33.cart.repository.ItemCartRepository;
import server.team33.exception.bussiness.BusinessLogicException;
import server.team33.exception.bussiness.ExceptionCode;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemCartService {

    private final ItemCartRepository itemCartRepository;
    public ItemCart addItemCart(ItemCart itemCart) {
        ItemCart findItemCart = checkItemCart(itemCart);

        if(findItemCart == null) {
            createItemCart(itemCart); // 상품이 장바구니에 없는 경우 장바구니에 추가
            return itemCart;
        } else {
            findItemCart.addQuantity(itemCart.getQuantity()); // 상품이 장바구니에 이미 있는 경우 수량만 증가
            itemCartRepository.save(findItemCart);
            return findItemCart;
        }
    }

    public ItemCart createItemCart(ItemCart itemCart) { // 상품이 장바구니에 없는 경우
        return itemCartRepository.save(itemCart);
    }

    public ItemCart checkItemCart(ItemCart itemCart) { // 장바구니에 특정 아이템이 이미 담겨있는지 확인
        return itemCartRepository.findByCartAndItemAndSubscription(
                itemCart.getCart(), itemCart.getItem(), itemCart.isSubscription());
    }

    public ItemCart findItemCart(long itemCartId) {
        ItemCart findItemCart = findVerifiedItemCart(itemCartId);
        return findItemCart;
    }

    public ItemCart updateItemCart(ItemCart itemCart, int upDown) { // 수량 변경( +1 or -1)
        itemCart.addQuantity(upDown);
        itemCartRepository.save(itemCart);
        return itemCart;
    }

    public void deleteItemCart(long itemCartId) {
        ItemCart itemCart = findVerifiedItemCart(itemCartId);
        itemCartRepository.delete(itemCart);
    }

    public List<ItemCart> findItemCarts(Cart cart, boolean subscription) {
        return itemCartRepository.findAllByCartAndSubscription(cart, subscription);
        // isSubscription == true 정기구독 장바구니 목록 조회
        // isSubscription == false 일반 장바구니 목록 조회
    }

    public ItemCart findVerifiedItemCart(long itemCartId) {
        Optional<ItemCart> optionalItemCart = itemCartRepository.findById(itemCartId);
        ItemCart findItemCart = optionalItemCart.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ITEMCART_NOT_FOUND));
        return findItemCart;
    }
}
