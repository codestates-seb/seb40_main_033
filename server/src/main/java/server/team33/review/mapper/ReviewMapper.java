package server.team33.review.mapper;

import org.mapstruct.Mapper;
import server.team33.exception.bussiness.BusinessLogicException;
import server.team33.exception.bussiness.ExceptionCode;
import server.team33.item.mapper.ItemMapper;
import server.team33.item.service.ItemService;
import server.team33.order.entity.ItemOrder;
import server.team33.order.service.ItemOrderService;
import server.team33.order.service.OrderService;
import server.team33.review.dto.ReviewDetailResponseDto;
import server.team33.review.dto.ReviewDto;
import server.team33.review.dto.ReviewResponseDto;
import server.team33.review.entity.Review;
import server.team33.review.service.ReviewService;
import server.team33.user.entity.User;
import server.team33.user.service.UserService;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    default Review reviewDtoToReview(long itemOrderId, ItemOrderService itemOrderService,
                                     UserService userService, OrderService orderService,
                                     ItemService itemService, ReviewDto reviewDto) { // 등록

        Review review = new Review();
        review.setUser(userService.getLoginUser());

        ItemOrder itemOrder = itemOrderService.findItemOrder(itemOrderId);

        if (!orderService.isShopper(itemOrder.getItem().getItemId(), review.getUser().getUserId())) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED_USER);
        } // 아이템 구매자만 리뷰를 작성할 수 있음

        review.setQuantity(itemOrder.getQuantity());
        review.setItem(itemService.findVerifiedItem(itemOrder.getItem().getItemId()));
        review.setContent(reviewDto.getContent());
        review.setStar(reviewDto.getStar());

        return review;
    }

    default Review reviewDtoToReview(long reviewId, UserService userService,
                                     ReviewService reviewService, ReviewDto reviewDto) { // 수정

        User user = userService.getLoginUser();

        if(user.getUserId() != reviewService.findReviewWriter(reviewId)) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED_USER);
        } // 리뷰 작성자만 리뷰를 수정할 수 있음

        Review review = new Review();
        review.setReviewId(reviewId);
        review.setUser(userService.getLoginUser());
        review.setContent(reviewDto.getContent());
        review.setStar(reviewDto.getStar());

        return review;
    }

    default ReviewResponseDto reviewToReviewResponseDto(Review review) {

        ReviewResponseDto reviewResponseDto = new ReviewResponseDto();
        reviewResponseDto.setReviewId(review.getReviewId());
        reviewResponseDto.setItemId(review.getItem().getItemId());
        reviewResponseDto.setUserId(review.getUser().getUserId());
        reviewResponseDto.setDisplayName(review.getUser().getDisplayName());
        reviewResponseDto.setContent(review.getContent());
        reviewResponseDto.setStar(review.getStar());
        reviewResponseDto.setCreatedAt(review.getCreatedAt());
        reviewResponseDto.setUpdatedAt(review.getUpdatedAt());

        return reviewResponseDto;
    }

    default List<ReviewResponseDto> reviewsToReviewResponseDtos(List<Review> reviews) {

        if(reviews == null) return null;

        List<ReviewResponseDto> reviewResponseDtos = new ArrayList<>();

        for(Review review : reviews) {
            reviewResponseDtos.add(reviewToReviewResponseDto(review));
        }

        return reviewResponseDtos;
    }

    default ReviewDetailResponseDto reviewToReviewDetailResponseDto(Review review, ItemMapper itemMapper) {

        ReviewDetailResponseDto reviewResponseDto = new ReviewDetailResponseDto();
        reviewResponseDto.setReviewId(review.getReviewId());
        reviewResponseDto.setItem(itemMapper.itemToItemSimpleResponseDto(review.getItem()));
        reviewResponseDto.setQuantity(review.getQuantity());
        reviewResponseDto.setUserId(review.getUser().getUserId());
        reviewResponseDto.setContent(review.getContent());
        reviewResponseDto.setStar(review.getStar());
        reviewResponseDto.setCreatedAt(review.getCreatedAt());
        reviewResponseDto.setUpdatedAt(review.getUpdatedAt());

        return reviewResponseDto;
    }

    default List<ReviewDetailResponseDto> reviewsToReviewDetailResponseDtos(List<Review> reviews, ItemMapper itemMapper) {

        if(reviews == null) return null;

        List<ReviewDetailResponseDto> reviewResponseDtos = new ArrayList<>();

        for(Review review : reviews) {
            reviewResponseDtos.add(reviewToReviewDetailResponseDto(review, itemMapper));
        }

        return reviewResponseDtos;
    }
}
