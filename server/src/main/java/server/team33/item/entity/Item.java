package server.team33.item.entity;

import lombok.*;
import server.team33.category.entity.Category;
import server.team33.nutritionFact.entity.NutritionFact;
import server.team33.review.entity.Review;
import server.team33.talk.entity.Talk;

import javax.persistence.*;
import java.util.ArrayList;
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
    private int sales;

    @Column
    private int capacity;

//    @Column
//    private boolean isWished;

    @Column
    private int servingSize;
//
//    @Enumerated(value = EnumType.STRING)
//    private Brand brand;

//    @OneToMany(mappedBy = "item", cascade = CascadeType.PERSIST)
//    private List<Wish> wishes = new ArrayList<>();

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<Category> categories = new ArrayList<>();

    public void addCategories(Category category) {
        categories.add(category);
        category.setItem(this);
    }

    @OneToMany(mappedBy = "item", cascade = CascadeType.PERSIST)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "item", cascade = CascadeType.PERSIST)
    private List<Talk> talks = new ArrayList<>();

    @OneToMany(mappedBy = "item", cascade = CascadeType.PERSIST)
    private List<NutritionFact> nutritionFacts = new ArrayList<>();


}
