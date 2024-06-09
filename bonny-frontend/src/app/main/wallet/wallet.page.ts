import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { History } from 'src/app/model/History';
import { Transaction } from 'src/app/model/Transaction';
import { HomeService } from '../home/home.service';
import { Profile } from 'src/app/model/Profile';
import * as _ from 'lodash'
import { format } from 'date-fns'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  segment: string = "overview"
  filter: Filter = "all"
  filterText: string = ""
  history: History[] = []
  filteredHistory: History[] = []

  //@ts-ignore
  profile: Profile = undefined

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService,
    private nav: NavController
  ) {
    this.loadProfile()
    this.listenToSectionParam()
   }

  ngOnInit() {}

  loadProfile() {
    this.homeService.getProfile$().subscribe((profile: Profile) => {
      this.profile = profile
      this.setHistory(profile.transactions)
    })
  }

  setHistory(transactions: Transaction[]) {

    console.log(transactions)
  
    let grouped = _.groupBy(
      transactions,
      (tx: Transaction) => format(new Date(tx.timestamp), "yyyy-MM-dd")
    )
    
    this.history = _.orderBy(
        Object.keys(grouped).map((date) => ({
        timestamp: date,
        transactions: _.orderBy(
          grouped[date],
          (tx: Transaction) => tx.timestamp,
          'desc'
        )
      })),
      (history: History) => history.timestamp,
      'desc'
    )

    console.log(this.history)
    this.setFilteredHistory()
  }

  listenToSectionParam() {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.segment = params.get("section") || "overview"
    })
  }

  selectFilter(filter: Filter) {
    this.filter = filter
    this.setFilteredHistory()
  }

  getFilterColor(filter: Filter) {
    if(this.filter == filter) return "primary"
    return "medium"
  }


  setFilteredHistory() {

    this.filteredHistory = this.history.map((h: History) => {
      return {
        timestamp: h.timestamp,
        transactions: h.transactions
        .filter((transaction: Transaction) => {
          if(this.filter == "all") return true
          return transaction.status == this.filter
        })
        .filter((transaction: Transaction) => {
          if(!transaction.receipt) return true
          return transaction.receipt.supplierName.toLowerCase().includes(this.filterText.trim().toLowerCase())
        })
      }
    }).filter(item => item.transactions.length > 0)
  }

  showCoupons() {
    this.nav.navigateForward("tabs/marketplace/earn/coupons")
  }

  showTransactions() {
    this.segment = "history"
  }

}

type Filter = "all" | "pending" | "confirmed"
