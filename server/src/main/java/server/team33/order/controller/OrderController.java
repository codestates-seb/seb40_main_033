package server.team33.order.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import server.team33.cart.service.CartService;
import server.team33.cart.service.ItemCartService;
import server.team33.item.mapper.ItemMapper;
import server.team33.item.service.ItemService;
import server.team33.order.dto.ItemOrderDto;
import server.team33.order.entity.ItemOrder;
import server.team33.order.entity.Order;
import server.team33.order.mapper.ItemOrderMapper;
import server.team33.order.mapper.OrderMapper;
import server.team33.order.service.ItemOrderService;
import server.team33.order.service.OrderService;
import server.team33.response.MultiResponseDto;
import server.team33.response.SingleResponseDto;
import server.team33.user.entity.User;
import server.team33.user.service.UserService;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j
@Validated
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;
    private final ItemService itemService;
    private final ItemOrderService itemOrderService;
    private final ItemCartService itemCartService;
    private final CartService cartService;
    private final UserService userService;
    private final OrderMapper orderMapper;
    private final ItemMapper itemMapper;
    private final ItemOrderMapper itemOrderMapper;
    @PostMapping("/single") // 상세페이지에서 바로 구매하기 요청을 하는 경우
    public ResponseEntity postSingleOrder(@RequestBody @Valid ItemOrderDto.Post itemOrderPostDto) {

        List<ItemOrder> itemOrders = itemOrderService.createItemOrder(
                itemOrderMapper.itemOrderPostDtoToItemOrder(itemOrderPostDto, itemService));

        User user = userService.getLoginUser(); // 기본 배송지 정보를 불러오기 위함.

        Order order = orderService.callOrder(itemOrders, user);

        return new ResponseEntity<>(new SingleResponseDto<>(
                orderMapper.orderToOrderDetailResponseDto(order, itemMapper, itemOrderMapper)), HttpStatus.OK);
    }

    @PostMapping// 장바구니에서 주문요청을 하는 경우
    public ResponseEntity postOrder(@RequestParam(value="subscription", defaultValue="false") boolean subscription) {

        User user = userService.getLoginUser();

        List<ItemOrder> itemOrders = itemOrderMapper.itemCartsToItemOrders(
                itemCartService.findItemCarts(user.getCart(), subscription, true), itemCartService);

        cartService.refreshCart(user.getCart().getCartId(), subscription);

        Order order = orderService.callOrder(itemOrders, user);

        return new ResponseEntity<>(new SingleResponseDto<>(
                orderMapper.orderToOrderDetailResponseDto(order, itemMapper, itemOrderMapper)), HttpStatus.OK);
    }

    @GetMapping // 로그인 한 유저의 일반 / 정기 주문 목록 불러오기
    public ResponseEntity getOrders(@Positive @RequestParam(value="page", defaultValue="1") int page,
                                    @RequestParam(value="subscription", defaultValue="false") boolean subscription) {
        Page<Order> pageOrders = orderService.findOrders(userService.getLoginUser(), page-1, subscription);

        List<Order> orders = pageOrders.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(
                orderMapper.ordersToOrderSimpleResponseDtos(orders, itemMapper), pageOrders), HttpStatus.OK);
    }

    @GetMapping("/subs") // 정기 구독 목록 불러오기
    public ResponseEntity getSubsciptions(@Positive @RequestParam(value = "page", defaultValue = "1") int page) {
        Page<ItemOrder> itemOrderPage = orderService.findAllSubs(userService.getLoginUser(), page-1);
        List<ItemOrder> itemOrders = itemOrderPage.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(
                itemOrderMapper.itemOrdersToSubResponses(itemOrders, itemMapper), itemOrderPage), HttpStatus.OK);
    }

    @PatchMapping("/subs/{itemOrder-id}") // 정기 구독 아이템의 수량 변경
    public ResponseEntity changeQuantity(@PathVariable("itemOrder-id") long itemOrderId, @RequestParam(value = "upDown") int upDown) {

        ItemOrder itemOrder = itemOrderService.changeSubQuantity(itemOrderId, upDown);

        return new ResponseEntity<>(new SingleResponseDto<>(
                itemOrderMapper.itemOrderToSubResponse(itemOrder, itemMapper)), HttpStatus.OK);
    }

    @GetMapping("/{order-id}") // 특정 주문의 상세 내역 확인
    public ResponseEntity getOrder(@PathVariable("order-id") @Positive long orderId) {

        Order order = orderService.findOrder(orderId);

        return new ResponseEntity<>(new SingleResponseDto<>(
                        orderMapper.orderToOrderDetailResponseDto(order, itemMapper, itemOrderMapper)), HttpStatus.OK);
    }

    @DeleteMapping("/{order-id}") // 특정 주문 취소
    public ResponseEntity cancelOrder(@PathVariable("order-id") @Positive long orderId) {
        orderService.cancelOrder(orderId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
