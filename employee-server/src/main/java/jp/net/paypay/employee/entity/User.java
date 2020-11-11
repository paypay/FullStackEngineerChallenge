package jp.net.paypay.employee.entity;

import jp.net.paypay.employee.base.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class User extends BaseEntity {

    private String name;

    private String username;

    private String password;

    private String avatar;

    private String introduction;

    private List<String> roles;

}
