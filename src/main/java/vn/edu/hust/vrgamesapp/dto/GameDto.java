package vn.edu.hust.vrgamesapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SecondaryRow;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GameDto {
    private Long id;
    private String name;
    private String description;
    private int duration;
    private double price;
}
