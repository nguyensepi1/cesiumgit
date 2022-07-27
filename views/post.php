<?php if (session_id() === '') session_start(); //Khỏi tạo session
    error_reporting(0); //Tắt báo lỗi của php
?>
<!DOCTYPE html>

<!-- Kết nối với database tên "cesium" -->
<?php
	$servername = "localhost";
    $username = "root";
    $password = "";
    $DBname = "cesium";
    // Create connection
    $connect = new mysqli($servername, $username, $password, $DBname);
	mysqli_set_charset($connect,"utf8");
    // Check connection
    if ($connect->connect_error) {
        die("Connection failed: " . $connect->connect_error);
    }
    if ($connect) echo 'Connect thanh cong!';
?>

<!-- 'start thực hiện kiểm tra dữ liệu người dùng post' -->
<?php
		if(isset($_POST["post"])){
		    $target_dir = "uploads/";
            $target_file = $target_dir . basename($_FILES["file"]["name"]);
            move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);
            
			$name = $_POST["name"];
            $axis = $_POST["axis"];
			$content = $_POST["content"];
			$file = $target_file;
            $img = $_POST["img"];
            
			mysqli_query($connect,"
				insert into data (name, axis, content, file, img)
				values ('$name', '$axis', '$content','$file', '$img')
			");			
		}
	?>
<!-- 'end thực hiện kiểm tra dữ liệu người dùng post' -->

<form action="" method="post" enctype="multipart/form-data">
    <div class="col-md-6 col-md-offset-3">
        <div class="alert alert-info">
            <strong>Trang đăng post</strong>
        </div>
    
        <div class="panel panel-primary">
            <div class="panel-body">
    
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" class="form-control" name="name" placeholder="Nhập tên..." required>
                </div>

                <div class="form-group">
                    <label for="x_axis">Axis:</label>
                    <input type="text" class="form-control" name="axis" placeholder="Nhập tọa độ..." required>
                </div>
    
                <div class="form-group">
                    <label for="content">Content:</label>
                    <input type="text" class="form-control" name="content" placeholder="Nhập mô tả..." required>
                </div>
    
                <div class="form-group">
                    <label for="file">File:</label>
                    <input type="file" class="form-control" name="file" id="file" placeholder="Nhập file...">
                </div>

                <div class="form-group">
                    <label for="file">IMG:</label>
                    <input type="file" class="form-control" name="img" id="img" placeholder="Nhập file...">
                </div>

                <button type="submit" class="btn btn-default" name="post">Đăng post</button>
            </div>
        </div>
    </div>
</form>