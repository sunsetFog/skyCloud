FROM nginx

# 原来路径/usr/share/nginx/html/   需要修改
ADD dist/ /var/www/html/

COPY default.conf /etc/nginx/conf.d/

# 用本地的 nginx.conf 配置来替换nginx镜像里的默认配置
# COPY nginx.conf /etc/nginx/nginx.conf
# 将证书文件内容复制到/usr/local/nginx/文件夹下
# COPY cert/ /usr/local/nginx/cert/

EXPOSE 2021
