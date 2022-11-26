package server.team33.item.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import server.team33.category.dto.CategoryDto;
import server.team33.item.entity.Brand;
import server.team33.nutritionFact.entity.NutritionFact;
import server.team33.response.MultiResponseDto;
import server.team33.review.dto.ReviewResponseDto;
import server.team33.talk.dto.TalkAndCommentDto;

import java.util.List;

public class ItemDto {


    @Getter
    @Setter
    @NoArgsConstructor
    public static class post {

        private String thumbnail;
        private String descriptionImage;
        private String title;
        private String content;
        private String expiration;
        private Brand brand;
        private int sales;
        private int price;
        private int capacity;
        private int servingSize;
        private int discountRate;
        private int discountPrice;
        private List<CategoryDto.Post> categories;
        // wish 관련되어 추가될 예정
        private List<NutritionFact> nutritionFacts;
        private double starAvg;
//        private List<Review> reviews;
//        private List<Talk> talks;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class ItemDetailResponse { // 아이템 상세 조회
        private Long ItemId;
        private String thumbnail;
        private String descriptionImage;
        private String title;
        private String content;
        private String expiration;
        private Brand brand;
        private int sales;
        private int price;
        private int capacity;
        private int servingSize;
        private int discountRate;
        private int discountPrice;
        private List<CategoryDto.Response> categories;
        private List<NutritionFact> nutritionFacts;
        private double starAvg;
        private MultiResponseDto<ReviewResponseDto> reviews;
        private MultiResponseDto<TalkAndCommentDto> talks;
    }


    @Getter
    @Setter
    @NoArgsConstructor
    public static class ItemCategoryResponse {
        private Long itemId;
        private String thumbnail;
        private String title;
        private String content;
        private int price;
        private Brand brand;
        private List<NutritionFact> nutritionFacts;
        // 리뷰 총 별점
        //item 의 찜의 여부
        private int reviewSize;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class ItemMainTop9Response {
        private MultiResponseDto<ItemCategoryResponse> bestItem;
        private MultiResponseDto<ItemCategoryResponse> saleItem;
    }
}
