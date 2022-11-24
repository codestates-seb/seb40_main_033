package server.team33.item.entity;

import lombok.*;
import server.team33.category.entity.Category;
import server.team33.nutritionFact.entity.NutritionFact;
import server.team33.review.entity.Review;
import server.team33.talk.entity.Talk;
import server.team33.wish.entity.Wish;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Item {

    @Id
    @Column(name = "ITEM_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    @Column
    private String title;

    @Column
    private String content;

    @Column
    private String thumbnail;

    @Column
    private String descriptionImage;

    @Column
    private String expiration;

    @Column
    private int discountPrice;

    @Column
    private int price;

    @Column
    private int discountRate;

    @Column
    private int view;

    @Column
    private int sales;

    @Column
    private int capacity;


    @Column
    private int servingSize;


    @Column
    private int totalWishes;


    @Enumerated(value = EnumType.STRING)
    private Brand brand;


    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<Wish> wishList = new ArrayList<>();


    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<Category> categories = new ArrayList<>();



    public void addCategories(Category category) {
        categories.add(category);
        category.setItem(this);
    }


    @Column
    private double starAvg;


    @OneToMany(mappedBy = "item", cascade = CascadeType.PERSIST)
    private List<Review> reviews = new ArrayList<>();


    @OneToMany(mappedBy = "item", cascade = CascadeType.PERSIST)
    private List<Talk> talks = new ArrayList<>();


    @OneToMany(mappedBy = "item", cascade = CascadeType.PERSIST)
    private List<NutritionFact> nutritionFacts = new ArrayList<>();


}
