<div class="pagination">
  <?php if ($page !== 1) { ?>
    <a class="btn" href="<?php echo $url ?>?page=1<?php echo empty($_GET['category']) ? '' : '&category=' . htmlspecialchars($_GET['category']) ?>">第一頁</a>
    <a class="btn" href="<?php echo $url ?>?page=<?php echo $page - 1 ?><?php echo empty($_GET['category']) ? '' : '&category=' . htmlspecialchars($_GET['category']) ?>">上一頁</a>
  <?php } ?>
  <?php if ($page !== $totalPage) { ?>
    <a class="btn" href="<?php echo $url ?>?page=<?php echo $page + 1 ?><?php echo empty($_GET['category']) ? '' : '&category=' . htmlspecialchars($_GET['category']) ?>">下一頁</a>
    <a class="btn" href="<?php echo $url ?>?page=<?php echo $totalPage ?><?php echo empty($_GET['category']) ? '' : '&category=' . htmlspecialchars($_GET['category']) ?>">最後一頁</a>
  <?php } ?>
  <p>共 <?php echo $count ?> 筆文章，頁數：<?php echo $page ?> / <?php echo $totalPage ?></p>
</div>