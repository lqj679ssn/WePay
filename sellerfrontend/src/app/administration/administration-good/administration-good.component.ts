import { Component, OnInit } from '@angular/core';
import { Good } from "app/_model";
import { GoodService } from 'app/_services/index'
import { SnackBarService } from 'app/_services/index';
import { Router } from '@angular/router';
import {DialogService} from 'app/_services';

@Component({
  selector: 'app-administration-good',
  templateUrl: './administration-good.component.html',
  styleUrls: ['./administration-good.component.css']
})
export class AdministrationGoodComponent implements OnInit {
  public goods: Good[];
  constructor(
    private goodService: GoodService,
    private snackBarService: SnackBarService,
    private router: Router,
    private dialogService:DialogService
  ) { }

  ngOnInit() {
    this.goods = [
      {
        category_name: "洗发露",
        category_id: 1,
        good_id: 1,
        good_name: "沙宣轻柔型洗发露",
        price: 15,
        store: 1000,
        pic: "../../../assets/img/xifashui.jpg",
        description: "真的很好！",
        gzipped: 0
      },
      {
        category_name: "洗发露",
        category_id: 1,
        good_id: 2,
        good_name: "沙宣轻柔型洗发露1",
        price: 22,
        store: 2200,
        pic: "../../../assets/img/xifashui.jpg",
        description: "真的很好！",
        gzipped: 0
      }
    ];
    this.getGoodInfo();
  }

  /**
   * 
   */
  public getGoodInfo(): void {
    /**
        {
          'code': 错误代码，默认为0（OK）
          'msg': OK / 不是商家用户
          'body': [{
          'good_id': 商品ID
          'good_name': 商品名
          'store': 商品库存
          'price': 商品价格
          'pic': 商品图片
	      }
     */
    this.goodService.getGoodsInfo().subscribe(
      data => {
        if (data.code == 0) {
          this.goods = data.body;
          console.log(this.goods);
          
          this.snackBarService.openSnackBar("刷新数据成功！");
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  /**
   * editGood
   */
  public editGood(good: Good) {
    this.router.navigate(['administration/good/', good.good_id]);
  }

  /**
   * deleteGood
   */
  public deleteGood(good: Good) {
    this.goodService.deleteGoodInfo(good.good_id).subscribe(
      data => {
        if (data.code == 0) {
          this.goods = this.goods.filter(c => c !== good);
          this.snackBarService.openSnackBar("删除成功！");
        }
      },
      error => {
        console.error(error);
      }
    );

  }
  public openDialog(good:Good) {
    this.dialogService
      .confirm('确认对话框', '你确定要删除商品吗，删除后将不可恢复？')
      .subscribe(res => {
        if(res == true){
          this.deleteGood(good);
        }
      });
  }
    /**
   * addCard
   */
  public addGood() {
    this.router.navigateByUrl("administration/addGood");
  }

}
