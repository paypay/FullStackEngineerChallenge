package jp.net.paypay.employee.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import jp.net.paypay.employee.base.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class Employee extends BaseEntity {
    private String name;

    @TableField(exist = false)
    private int commentCount;
}
