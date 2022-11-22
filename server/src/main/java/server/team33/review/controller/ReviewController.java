package server.team33.review.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import server.team33.item.mapper.ItemMapper;
import server.team33.item.service.ItemService;
import server.team33.order.service.OrderService;
import server.team33.response.MultiResponseDto;
import server.team33.response.SingleResponseDto;
import server.team33.review.dto.ReviewDto;
import server.team33.review.entity.Review;
import server.team33.review.mapper.ReviewMapper;
import server.team33.review.service.ReviewService;
import server.team33.user.entity.User;
import server.team33.user.service.UserService;

import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j
@Validated
@CrossOrigin
@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final ReviewMapper reviewMapper;
    private final UserService userService;
    private final ItemService itemService;
    private final ItemMapper itemMapper;
    private final OrderService orderService;

    @PostMapping("/{item-id}") // 주문 상세 내역에서 작성
    public ResponseEntity postReview(@PathVariable("item-id") @Positive long itemId,
                                     @RequestBody ReviewDto reviewDto) {

        Review review = reviewService.createReview(
                reviewMapper.reviewDtoToReview(itemId, userService, orderService, itemService, reviewDto));

        return  new ResponseEntity<>(
                new SingleResponseDto<>(reviewMapper.reviewToReviewResponseDto(review)), HttpStatus.CREATED);
    }

    @PatchMapping("/{review-id}") // 마이페이지 작성글 관리, 아이템 상세페이지
    public ResponseEntity updateReview(@PathVariable("review-id") @Positive long reviewId,
                                       @RequestBody ReviewDto reviewDto) {

        Review review = reviewMapper.reviewDtoToReview(reviewId, userService, reviewService, reviewDto);

        Review updatedReview = reviewService.updateReview(review);

        return  new ResponseEntity<>(new SingleResponseDto<>(
                reviewMapper.reviewToReviewResponseDto(updatedReview)), HttpStatus.OK);
    }

    @GetMapping("/mypage")
    public ResponseEntity getUserReviews(@Positive @RequestParam(value="page", defaultValue="1") int page,
                                         @Positive @RequestParam(value="size", defaultValue="7") int size,
                                         @RequestParam(value="sort", defaultValue="reviewId") String sort) {

        Page<Review> pageReviews = reviewService.findReviews(userService.getLoginUser(), page-1, size, sort);

        List<Review> reviews = pageReviews.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(
                reviewMapper.reviewsToReviewDetailResponseDtos(reviews, itemMapper), pageReviews), HttpStatus.OK);
    }

    @GetMapping("/{review-id}")
    public ResponseEntity getReview(@PathVariable("review-id") @Positive long reviewId) {

        Review review = reviewService.findReview(reviewId);

        return  new ResponseEntity<>(new SingleResponseDto<>(
                reviewMapper.reviewToReviewResponseDto(review)), HttpStatus.OK);
    }

    @DeleteMapping("/{review-id}") // 마이페이지 작성글 관리, 아이템 상세페이지
    public ResponseEntity deleteReview(@PathVariable("review-id") @Positive long reviewId) {

        User user = userService.getLoginUser();
        reviewService.deleteReview(reviewId, user.getUserId());

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
