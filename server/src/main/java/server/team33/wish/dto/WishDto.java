package server.team33.wish.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import server.team33.item.entity.Brand;
import server.team33.nutritionFact.entity.NutritionFact;

import java.util.List;

public class WishDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WishItemResponseDto {
        private long itemId;
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
    @AllArgsConstructor
    public static class WishResponseDto {
        private long itemId;
        private int wish;
        private int totalWishes;
    }

}
