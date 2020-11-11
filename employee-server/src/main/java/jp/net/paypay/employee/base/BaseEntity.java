package jp.net.paypay.employee.base;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import jp.net.paypay.employee.util.IDUtil;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

@Data
public class BaseEntity implements Serializable {
    public BaseEntity() {
        this.id = IDUtil.getId();
    }

    @TableId(value = "id", type = IdType.INPUT)
    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+9")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date createdBy;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+9")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date updatedBy;
}
