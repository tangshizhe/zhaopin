# 企业服务 & 资金扶持

## 分支描述
```
-- master 主分支提供源代码以及构建编译后的 web.zip 文件下载
    -- ent 企业服务源代码
    -- gov 资金扶持源代码

-- dev    开发测试分支与主分支功能一致
```

## 更新

```
更新记录
例子🌰：
// 2020/03/26
--  master  V 0.0.1      // 主分支版本跟随 ent
    --  ent     V 0.0.1  [download](xxxx)
    --  funds   V 0.0.2  [download](xxxx)
```

## 简介

> 项目基于 vue & vant 搭建多页面实例

## 目录

```
--  ent   // 企业服务架构相关
--  funds // 资金扶持相关
```

## 部署

```
// nginx 配置参考

location ^~/ent-gov/ {
    alias /usr/local/var/www/dist/;
    index ent.html;
    try_files $uri $uri/ /ent.html;
}

location ^~/ent-gov/funds {
    alias /usr/local/var/www/dist/;
    index funds.html;
    try_files $uri $uri/ /ent-gov/funds/funds.html;
}

location ^~/ent-gov/ent {
    alias /usr/local/var/www/dist/;
    index ent.html;
    try_files $uri $uri/ /ent-gov/ent/ent.html;
}

```

