package vn.edu.hust.vrgamesapp.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.edu.hust.vrgamesapp.constant.RoleEnum;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoleDto {
    private Long id;

    @NotNull(message = "Role name is required")
    private RoleEnum name;
}