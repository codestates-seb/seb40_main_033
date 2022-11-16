package server.team33.item.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import server.team33.nutritionFact.entity.NutritionFact;
import server.team33.review.entity.Review;
import server.team33.talk.entity.Talk;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Item {

    @Id
    @Column(name = "ITEM_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    @Column(name = "ITEM_TITLE")
    private String title;

    @Column(name = "ITEM_CONTENT")
    private String content;

    @Column(name = "ITEM_THUMBNAIL")
    private String thumbnail;

    @Column(name = "ITEM_DESCRIPTION_IMAGE")
    private String descriptionImage;

    @Column(name = "ITEM_EXPIRATION")
    private String expiration;


    @Column(name = "ITEM_PRICE")
    private int price;

    @Column(name = "ITEM_DISCOUNT_RATE")
    private int discountRate;

    @Column(name = "ITEM_SALES")
    private int sales;

    @Column(name = "ITEM_CAPACITY")
    private int capacity;

    @Column(name = "ITEM_SERVING_SIZE")
    private int servingSize;

    //private List<Item> items;

    @JsonIgnore
    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<Review> reviews;

    @JsonIgnore
    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<Talk> talks;

    @JsonIgnore
    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<NutritionFact> nutritionFacts;


    //@Enumerated(EnumType.STRING)
    //private Brand brand;




}
