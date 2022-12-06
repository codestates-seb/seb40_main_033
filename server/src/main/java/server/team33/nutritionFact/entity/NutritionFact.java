package server.team33.nutritionFact.entity;

import lombok.*;
import server.team33.item.entity.Item;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class NutritionFact {

    @Id
    @GeneratedValue
    private Long nutritionFactId;

    @ManyToOne
    @JoinColumn(name = "ITEM_ID")
    private Item item;

    private String ingredient;

    private String volume;
}
