<template>
  <div class="visitorsAddFace" ref="visitorsAddFace">
       <div
        type="primary"
        round
        style=" border: 1px solid rgb(83, 83, 83);height:350px;width:80%;border-radius: 10px;text-align:left;background-color: #fff;padding:10px;margin:25px;background-color:rgb(250, 250, 250)"
      >
      说明：照片用于访客人脸门禁
      <br>
      规则：本人免冠正面照
      <img :src="imgs[0]" @click="upload" style="width: 90%;height: 85%;border-radius: 10px;margin:10px;" />
      </div>
      <input
            style="float: left;  display: none;"
            type="file"
            id="uploadFile"
            accept="image/*"
            v-on:change="readLocalFile()"
          />

       <div style="padding:10px">
        <button class="sure"  @click="sure" type="primary" round>点击上传</button>
      </div>
  </div>
</template>

<script>
export default {
  name: "visitorsAddFace",
  components: {
  },
  data() {
    return {
        url:"",
        imgs:[],
        fileData: [],
    }
  },
   methods: {
    //监听返回按钮
    goBack() {
      this.$router.push({
        path: "/visitorInfoPage",
        query: {
          pagename: "visitorsAddFace"
        }
      });
    },
    //上传照片
    upload: function() {
      document.getElementById("uploadFile").click();
    },
    // uploadFile
    //点击选中图片
    readLocalFile: function() {
      var local = document.getElementById("uploadFile");
      var localFile = document.getElementById("uploadFile").files[0];

      this.fileData.push(local);
      var current = this;
      var reader = new FileReader();
      var content;
      reader.onload = function(event) {
        content = event.target.result;
        current.imgs = [];
        current.imgs.push(content); //获取图片base64代码
      };
      reader.onerror = function(event) {
        alert("error");
      };

      content = reader.readAsDataURL(localFile, "UTF-8");
      var sss = document.getElementById("uploadFile").value;
      var dd = document.getElementById("uploadFile").files[0];
      //   console.log(sss);
    },
    getAttendanceRecord() {
      let signWords = {
        userId: localStorage.getItem("userId"),
      };
      let fileFormData = new FormData();
      fileFormData.append("information", JSON.stringify(signWords));
        let file = this.fileData[0].files[0];
        fileFormData.append("picture", file, file.name);
      return fileFormData;
    },
    sure() {
      if (this.imgs.length < 1) {
        alert("请点击图片区域选择照片！");
        return;
      }
     
      var _this = this;

      var information = _this.getAttendanceRecord();

      var url =
        "http://" +
        this.getSERVER_HOST_MAIN() +
        ":" +
        this.getSERVER_PORT_MAIN() +
        "/" +
        this.getPROJECT_MAIN() +
        "/user/addVisitorSubscribeFace.do";

      _this.$ajax
        .post(url, information, {
          headers: { "Content-type": "multipart/form-data" }
        })
        .then(function(response) {
          if (response.data.code == 1001) {
            alert("上传成功！");
            localStorage.setItem(
                "url",
                response.data.data.url
              );
            _this.goBack();
          } else {
            alert("上传失败，请检查网络！");
            return;
          }
        });
    },
   },
   created: function() {
    var _this = this;
    _this.imgs = ["http://" +
        this.getSERVER_HOST_MAIN() +
        ":" +
        this.getSERVER_PORT_MAIN() +localStorage.getItem("url").replace(/[\r\n]/g, "")];
  }
}

</script>   

<style scoped>
.visitorsAddFace {
  width: 100%;
  /* background-color: rgb(240, 240, 240); */
  text-align: center;
}



.sure {
  width: 55%;
  color: #eee;
  font-size: 28px;
  border-radius: 10px;
  background-color: #149760; /* 标准的语法 */
  margin-bottom: 50px;
  /* filter: brightness(1.4);  */
  /* flex-grow: -999; */
}

</style>