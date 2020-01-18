package dev.yidafu.surpass.UserCenter.dao;

import dev.yidafu.surpass.UserCenter.entity.Roles;
import java.util.List;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.apache.ibatis.type.JdbcType;

public interface RolesMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table roles
     *
     * @mbg.generated
     */
    @Delete({
        "delete from roles",
        "where id = #{id,jdbcType=INTEGER}"
    })
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table roles
     *
     * @mbg.generated
     */
    @Insert({
        "insert into roles (id, roleName, ",
        "`comment`)",
        "values (#{id,jdbcType=INTEGER}, #{roleName,jdbcType=VARCHAR}, ",
        "#{comment,jdbcType=VARCHAR})"
    })
    int insert(Roles record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table roles
     *
     * @mbg.generated
     */
    @Select({
        "select",
        "id, roleName, `comment`",
        "from roles",
        "where id = #{id,jdbcType=INTEGER}"
    })
    @Results({
        @Result(column="id", property="id", jdbcType=JdbcType.INTEGER, id=true),
        @Result(column="roleName", property="roleName", jdbcType=JdbcType.VARCHAR),
        @Result(column="comment", property="comment", jdbcType=JdbcType.VARCHAR)
    })
    Roles selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table roles
     *
     * @mbg.generated
     */
    @Select({
        "select",
        "id, roleName, `comment`",
        "from roles"
    })
    @Results({
        @Result(column="id", property="id", jdbcType=JdbcType.INTEGER, id=true),
        @Result(column="roleName", property="roleName", jdbcType=JdbcType.VARCHAR),
        @Result(column="comment", property="comment", jdbcType=JdbcType.VARCHAR)
    })
    List<Roles> selectAll();

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table roles
     *
     * @mbg.generated
     */
    @Update({
        "update roles",
        "set roleName = #{roleName,jdbcType=VARCHAR},",
          "`comment` = #{comment,jdbcType=VARCHAR}",
        "where id = #{id,jdbcType=INTEGER}"
    })
    int updateByPrimaryKey(Roles record);
}