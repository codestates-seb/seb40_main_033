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

    public ItemCart updownItemCart(long itemCartId, int upDown) { // 수량 변경( +1 or -1)
        ItemCart itemCart = findVerifiedItemCart(itemCartId);
        itemCart.addQuantity(upDown);
        itemCartRepository.save(itemCart);
        return itemCart;
    }

    public ItemCart periodItemCart(long itemCartId, int period) { // 정기 구독 주기 변경
        ItemCart itemCart = findVerifiedItemCart(itemCartId);
        itemCart.setPeriod(period);
        return itemCartRepository.save(itemCart);
    }

    public ItemCart excludeItemCart(long itemCartId, boolean buyNow) { // 아이템 체크 및 해제
        ItemCart itemCart = findVerifiedItemCart(itemCartId);
        itemCart.setBuyNow(buyNow);
        return itemCartRepository.save(itemCart);
    }

    public long deleteItemCart(long itemCartId) { // 장바구니 항목 삭제
        ItemCart itemCart = findVerifiedItemCart(itemCartId);
        long cartId = itemCart.getCart().getCartId(); // 장바구니 리프레시를 위해 카트 정보 확인
        itemCartRepository.delete(itemCart);

        return cartId;
    }

    public List<ItemCart> findItemCarts(Cart cart, boolean subscription) { // 장바구니 목록 조회
        return itemCartRepository.findAllByCartAndSubscription(cart, subscription);
        // subscription - true 정기구독, false 일반
    }

    public List<ItemCart> findItemCarts(Cart cart, boolean subscription, boolean buyNow) { // 금액 합계, 주문
        return itemCartRepository.findAllByCartAndSubscriptionAndBuyNow(cart, subscription, buyNow);
        // subscription - true 정기구독, false 일반
        // buyNow - true 체크박스 활성화, false 체크박스 비활성화
    }

    public ItemCart findVerifiedItemCart(long itemCartId) {
        Optional<ItemCart> optionalItemCart = itemCartRepository.findById(itemCartId);
        ItemCart findItemCart = optionalItemCart.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ITEMCART_NOT_FOUND));
        return findItemCart;
    }
}
