package server.team33.item.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import server.team33.nutritionFact.entity.NutritionFact;
import server.team33.review.entity.Review;
import server.team33.talk.entity.Talk;

import java.util.List;

public class ItemDto {


    @Getter
    @Setter
    @NoArgsConstructor
    public static class post {

        //private List<CategoryStatus> categoryStatus;
        //private Item.Brand brand;
        private String thumbnail;
        private String descriptionImage;
        private String title;
        private String content;
        private String expiration;
        private int sales;
        private int price;
        private int capacity;
        private int servingSize;
        private int discountRate;
        private int discountPrice;
        private List<NutritionFact> nutritionFacts;
        private List<Review> reviews;
        private List<Talk> talks;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response { // 아이템 상세 조회
        private Long ItemId;
        //private List<CategoryStatus> categoryStatus;
        //private Item.Brand brand;
        private String thumbnail;
        private String descriptionImage;
        private String title;
        private String content;
        private String expiration;
        private int sales;
        private int price;
        private int capacity;
        private int servingSize;
        private int discountRate;
        private int discountPrice;
        private List<NutritionFact> nutritionFacts;
        private List<Review> reviews;
        private List<Talk> talks;
    }
}
