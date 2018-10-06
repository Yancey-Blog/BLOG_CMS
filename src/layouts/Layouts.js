import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './layouts.css';
import {
  Layout, Menu, Icon, Tooltip,
} from 'antd';
import Motto from '../containers/Home/Motto/Motto';
import Project from '../containers/Home/Project/Project';
import Announcement from '../containers/Home/Announcement/Announcement';
import Cover from '../containers/Home/Cover/Cover';
import LiveTour from '../containers/Music/LiveTour/LiveTour';
import FeaturedRecord from '../containers/Music/FeaturedRecord/FeaturedRecord';
import YanceyMusic from '../containers/Music/YanceyMusic/YanceyMusic';
import Player from '../containers/Music/Player/Player';
import OverView from '../containers/Overview/OverView';
import CV from '../containers/CV/CV';
import Article from '../containers/Article/Article';
import ArticleDetail from '../containers/Article/ArticleDetail';
import About from '../containers/About/About';
import Setting from '../containers/Setting/Setting';
import UserDrop from '../components/UserDrop/UserDrop';
import Exception from '../containers/Exception/Exception';

const {
  Header, Sider, Content, Footer,
} = Layout;
const SubMenu = Menu.SubMenu;

class Layouts extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout
        style={{ minHeight: '100vh' }}
      >
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={256}
        >
          <div className="logo">
            <a href="/">
              <img
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRQBAwQEBQQFCQUFCRQNCw0UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/AABEIAHgAeAMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AO7r8LP6vCgAoAKACgCSCCW6lWKGNppW4CIpYn6AU1Fydoq5EpxguaTsjrNM+EPjPV0DW3hu+2noZ4/JB/77xXpU8rxtXWNJ/PT87HhVs+yyg7Trx+Tv+VzV/wCGeviBjP8Awj//AJOW/wD8crp/sPMP+ff4x/zOL/WrJ/8An/8A+Sy/+RMrU/hB4z0hC9z4cvtg6mCPzsf98ZrmqZXjaWsqT+Wv5XO2jn+V13aFePzdvzscnPby2srRTRvDKpwUkUqR9Qa81pxdpLU92MozXNF3RHSLCgAoAKACgAoAKACgDQ0Hw/qPibU4tP0qzlvbuTpHEM4HqT0A9zxW1GjUxE1TpRuzjxWLoYOk62IkoxXf+tfQ+hvAn7LFrAiXPim7a5lPP2G0YrGPZn6n8MfU19xg+HIJKWLd32X+f+Vj8rzLjSpNungI8q/mer+S2Xzv6HtmheFdH8MQCHStMtrBMYPkRBS31PU/jX1tHDUcOrUoJeh+eYnGYnGS5sRUcn5s1QMV0nGLQAnWgDK13wro/ie38nVdMtb9MYHnxBiv0PUfhXNWw1HEK1WCl6o7MNjMRg5c2HqOL8n/AFc+Xvj18NvCngGa3OkX00V/cHd/ZbHzQif39xOVHYA5zz6GvzvOsBhME17GT5n9nfTv5fjc/ZOGc3zDM1JYmCcI/b217W2fytY8er5g+/CgAoAKACgAoA6n4e/D3U/iNrgsLBfLhTDXF04ykKep9Sew7/TJHoYHA1cdV9nT26vseHmubUMooe1q6t7Lq3/l3Z9keA/h7o/w90kWWl24DsB51y4Blmb1Y/06Cv1TB4GjgafJSXq+rPwLMs0xOa1va4iXoui9P8zp69A8kKACgAoAKAPO/i/8XbL4aaVsj2XOt3Cn7Pak8KP77+ij9Tx6keHmmZwy+FlrN7L9X5fmfU5FkdXOKt3pSju/0Xn+R8b6xrF7r+pXGoahcPdXlw5eSVzyT/QdgO1fldWrOtN1Kju2fvuHw9LC0o0aMbRWyKdZnSFABQAUAFAGhoGhXnibWrPS7CIy3d1II417e5PoAMkn0FbUaM8RUjSpq7ZyYrE08HQliKztGKu/68z7h+HvgSx+Hvhu30yzUM4G+e4xhppD1Y/yA7ACv17A4OngaKpQ+b7s/nHNMyq5riZYir8l2Xb/AD8zp69A8kKACgAoAKAPPfi58XLH4aaVtTZda1Op+zWmenbe/oo/XoO5Hh5nmcMvhprN7L9X5fmfT5HkdXN6t3pTW7/Ref5fn8b63rd94j1S41HUbh7q8nbc8jnr7D0A6ADpX5ZWrTrzdSo7tn79hsNSwdKNChG0VsijWR1BQAUAFABQAUAfSn7K/gRYbG78VXUYMsxNtaZHRB99h9T8v/AT6197w5g7RlipLV6L9X+h+QcaZk51I5fTei1l6vZfJa/NH0JX25+XiHigDh/GHxn8KeCbhra/1ES3i/etbRTLIvs2OFPsSK8fFZrhMJLlqS17LX/hj6HAZBmGYx56NO0e70Xy6v5HPaf+054LvrhYpHvrEE4824t/lH/fJY/pXDT4hwU3Ztr1X+Vz1avB+aUo80VGXknr+KR6hpup2msWUV3Y3MV3ayruSaFwysPYivoqdSFWKnB3T7Hx1WlUoTdOrFxkt09zhfi98X7H4aaZ5cey71udSbe0zwo/vv6L+pxgdyPGzPNIYCFlrN7L9X5fmfSZFkVXN6t37tJbv9F5/kfHOta3feItUuNR1K5e6vJ23SSOeT7D0A6ADpX5bVqzrzdSo7tn75hsNSwlKNGhG0VsjqvhX8KtQ+Jmr+XHutdLgP8ApN5t4X/ZX1Y/p1Pv6WXZdUzCpZaRW7/y8zw87zujk9G71qPaP6vyIfiZ8MdT+GusfZ7pTPYykm2vVXCyD0Pow7j+YqMwy+rl9TlnrF7Pv/wTXJs5oZxR56ek18Ueq/4HmcbXln0IUAFABQBJbW8l3cRQRLvllcIijuScAU4xcmordmc5qnFzlsj7+8K6DF4Y8N6bpMAHl2lukOQPvEDlvxOT+NftWGorD0YUo9FY/mDGYmWMxFTES3k2/wCvQ1q6TjPJf2hfiZP4G8Ow2Omy+VqupblWVT80MYxuYe5yAPxPavms8zCWDoqnTdpS/BdT7XhbJ4ZniXVrq9OHTu3svTq/+CfITu0js7sWdjksTkk+tfmDberP3hJRVkhKCjtvhz8Wta+Gv2xLErcWtwhH2acnYkmPlkHuO47j8CPWwGZ1sBzKnqn0ffv/AFufN5vkWFzfldXSUXut2uq/rY5XV9XvNf1K41DULh7q8uG3ySyHkn+g9u1ebVqzrTdSo7tnt4ehSwtKNGjG0Vsjq/hX8LNQ+Jms+TFuttMhIN1eEcKP7q+rH07dT7+ll2XVMwqWWkVu/wCup4ed51Ryijd6zfwr9X5f0j7O8OeHNP8ACej2+maZbrbWkC4VR1J7knuT3Nfq1ChTw1NUqSskfgGKxVbG1pV68ryf9fcM8UeF9O8X6NcaZqdutxazDkHqp7Mp7EdjSxGHp4qm6VVXTHhMZWwFaOIw8rSX9Wfkz4w+J/wx1D4a60befNxp8xJtbwD5ZB6H0Ydx+NflOYZdUy+pyy1i9n/XU/oHJs5o5xR546TXxR7f8B9zjK8o+iCgAoA7H4PaYmr/ABP8N27jKi7WbHr5YL/+y16mV0/a42lF97/dqfPZ/WdDK681/Lb79P1PuYcV+wH84i0AfKX7V/nf8J9pu7Pk/wBmps9M+ZJn+n6V+bcS3+txvty/qz9r4I5fqFS2/O/yR4pXyh+iBQAUAdr8LvhdqPxM1kQQhrfTIWBur0jhB/dX1Y9h+Jr1suy6pmFSy0it3/XU+bzrOqOT0eaWs38Me/m/I+zvDPhrTvCOjW+l6Xbrb2kIwFHVj3Zj3J7mv1bD4enhaapUlZI/AMXi62OrSr15Xk/6svI1a6DjCgDH8VeFdO8Z6JcaXqkAntph9GRuzKexHrXLicNTxVN0qqun/VztweNr4CvHEYeVpL8fJ+R8W/Ez4d3fw28RHT7ieO5gkXzbedCMvHnGWX+E8Y/lX5PmGBnl9b2cndPZ+R/QeTZtTzjDe2grNaNdn5Pqjka8098KAPRf2ev+SweH89P9I/8ASeSvcyP/AJGFP5/+ks+S4q/5E9b/ALd/9KifadfrB/PoUAeT/tA/DCfx74ehvNNj8zV9O3MkQ6zRnG5B78Aj8R3r5rO8vljaKnTXvx/Fdv8AI+14XziOWYl067tTnu+z6P07/wDAPkKWKS3leKVGjlQlWRxgqR1BHY1+YNOLsz93jJTSlF3TGUFnafDH4Xan8S9YWG3VrfTYmH2m+K/LGPQerHsPxPFerl+XVcwqcsdIrd/11Pnc5zqhlFHmnrN7R6v/ACXmfZ/hnwzp3hDRrfS9Ltxb2kIwAOrHuzHuT3Nfq+Hw9PC01SpKyR/P2LxdbHVpYivK8n/Vl5I1a6DjCgAoA8++LfxbsfhppWF23Wszqfs1pnp/tv6KP1PA7keJmeZwy+nZazey/V+X5n02R5HVzit2preX6Lz/AC3fn8ca9r1/4m1W41LU7l7q8nbc8j/oAOwHYCvyytWqYio6lV3bP37C4WjgqMaFCNor+vvOk+GHwv1L4l6x5FuDb6dCR9qvGXKoPQerHsPxNd+XZdVzCpyx0it3/XU8fOc6oZPR5p6zfwx7/wCSI/i54fsPCvxC1TSdNjMdnaiBEBbJJ8mMsSfUkkn61OZ0IYbFzpUlorfki8hxVbG5dTxFd3lLmv8A+BO33IT4R6ouj/Ezw5cucL9rSIn0D/J/7NRllT2WNpSff89P1Hn1F18srwX8rf3a/ofdAORX7CfzeLQAhGaAOR8W/Cjwt42lM2q6VHJdH/l5iJjk/Flxn8c15mJy3C4t81WGvdaP8D28DnWPy5cuHqNR7PVfc9vkc5Y/s2eB7KdZXsbi7wchJ7liv5DGa4IZBgYO7i36s9epxbmtSPKpqPol+tz0jTdLtNGs47SxtorS2jGEhhQIqj2Ar3qdOFKKhTVkuiPkqtWpXm6lWTlJ9Xqzx/4w/tBR+DLuXRtDjivNWTiaaTmK3Ppgfeb26DvnkV8vmmdrCSdGgrz6vov+CfdZDwvLMYLE4tuNN7Jby/yX5/ieFXfxu8c3k5lfxFcxknIWIKij8AAK+Olm+Ok7uq/lofpcOHMqpx5VQXzu/wA2dR4N/aY8S6JdxprTLrdgSA+5FSZR6qwAB/4EDn1FejhOIMTRklW9+P4ni5hwdgcRBvC/u5/Np+qf6fcexeO/j/ofhzwra3+lzR6lf6hF5lpb5+6Om6T+6AQRjqSCPUj6nG51QoUI1KT5pSWi/wAz4HLOGMXjMVKjXXJGDtJ/pHvdddkte1/krXNcvvEmq3GpalcPdXk7bnkf+Q9AOgA6V+Z1q1TETdSo7tn7nhsNSwlKNChHlitjqvhb8K9Q+Jmr+XFuttLhYfabwjhR/dX1Y+nbqa9HLsuqZhUstIrd/wBdTxM6zujk9G8taj2j+r8j7K8NeGtO8I6NBpmmW621pCMBR1Y92Y9ye5r9Vw+Hp4WmqVJWSPwDF4utjq0sRiJXk/6svI+Kvi1qS6t8S/ElwnK/bHjB9dh2Z/8AHa/Jsyqe0xlWXm/w0P6GyKi6GWUIP+VP79f1OVhme2mjmjYpJGwdWHYg5BrzotxaaPblFTi4y2Z9/wDhPXYvE/hrTNVhxsvLdJsD+Ekcr+ByPwr9qw1ZYijCququfzBjcNLB4mph5fZbRrV0nEFABQAUAZfijVjoPhvVdSADNaWss4B6Eqhb+lc+Iq+xozqdk39yOvB0frOJp0H9qSX3ux+f9zdS3tzLcTyNLPK5kkdjksxOST+NfikpObcpPVn9PwhGnBQgrJaIjpGoUAJQB3Pwr+FmofEvV9ke620qBh9qvMcKP7q+rH9Op9/Xy7LamYVLLSK3f6ep8zned0cno3etR/Cv1fkfZnhvw3p/hPR7fTNMt1trSBcKi9T6knuT3NfquHw9PDU1SpKyR+A4rFVsbWlXryvJ/wBfcJ4p12Lwz4b1LVZiNlpbvNgn7xA4H4nA/Gliayw9GdWXRXHg8NLGYinh47yaX9eh8ATzvczSTStukkYuzHuSck1+KtuTbfU/qCEVCKjHZEdIs+l/2V/HS3GnXfha5f8Ae27G5tMnrGT86j6Mc/8AAj6V99w5jFKMsLJ6rVenX+vM/HuNctcKscfBaS0l6rZ/NafI+ga+2PzEKACgAoAy/E+knXvDmq6aCFN5ay24J7FkK5/WufEUvbUZ0u6a+9HXhK/1bE06/wDLJP7nc+ALu1lsbqa2uI2inhdo5I24KsDgg/jX4pKLg3GSs0f0/TnGpBTg7pq6ZFSNQoA7X4WfDG++Jeui2i3W+nQENd3eOEX+6vqx7D8a9bLsvqZhV5VpFbv+up85nec0snoc8tZv4V38/RdT7P8ADfhzT/Cmj22mabbrbWkC4VB1J7knuT3Nfq1ChTw1NUqSskfz7isVWxtaVevK8n/WnkaldBynz/8AtUeO1ttNtfC1s4M1yRcXeD92MH5FP1YZ/wCAj1r4niPGKMFhYvV6v06f15H6dwXlrnVlj6i0jpH1e7+S0+Z8z18CfsIUAaPhzxBeeFtcs9V0+Tyru1kDoex9VPsRkH2Nb0K08PVjVpvVHHi8LSxtCeHrK8ZK39ea3R9x+AfHFh4/8OW+qWLAbxtmhzloZB95D/nkYNfr2CxlPG0VVp/NdmfzhmWXVsrxMsPW6bPuu50ld55YUAFABQB4p8Zf2f18ZXkut6E8VrqzjM8Enyx3BH8WR91v0PfHJPyWa5J9bk69B2l1XR/8E/Qcg4oeXQWFxabprZreP+a/FHgV58H/ABpYzmKTw3fuw7wxeav/AH0uR+tfFyyvGwdnSf5/kfp1PP8AK6seZYiPzdvwdjq/BX7NvibxBdxvq0Q0OwBy7SkNMw9FQHg/72Pxr0sJkGKryTrLkj57/d/meHmPF2BwsHHDP2k/Lb5v/K59SeFPCem+C9Fg0vS7cQW0XPPLO3dmPcn1r9Fw2GpYSmqVJWSPxrG42vmFZ4jESvJ/h5LyNmuo4TmPiH49sPh54cn1O9YM4GyC3Bw00nZR/MnsM15+OxtPA0XVn8l3Z62V5bWzXErD0vm+y7/5eZ8P+IdevPE+t3mq6hKZbu6kMjnsPQD0AGAB6CvyGvWniKkqtR6s/o3CYWlgqEcPRVoxVv68+5nVidgUAFAHWfDj4j6l8N9bF7ZHzraTC3No5wky/wBCOx7fTIr0cBj6uAq88NU913/4J4Ob5RQzeh7KrpJbPqn/AJd0fZHgfx9pHj/SVvtKuRJwPNgbAkhb+6y9vr0Pav1TB42jjafPSfquqPwLMctxOV1vY4iNuz6P0OkrvPLCgAoAKACgAoAKAOV8f/EbR/h1pJu9SnBmYHyLSMgyzH0A9PUngV5uNx9HAw56r16Lqz2MsyrE5rV9lQWnV9F6/wCR8b+P/H+qfETXH1DUX2ouVgtUP7uBPQe/qe/5CvyzG42rjqvtKnyXRH77lWVUMpoKjRWvV9W/62XQ5muA9oKACgAoAKANLQPEepeFtSjv9KvJbK7j6SRnqPQjoR7HitqFerh5qpSlZnHisJQxtJ0cRBSi+/6dmfQvgb9qi0uES28U2jWkvT7baKWjPuydR+GfoK+4wfEcJe7io281/kfleZcF1YNzwEuZfyvR/J7P52Pa9C8V6N4ng87StTtb9MZPkShiv1HUfjX1tHE0cQr0pp+h+eYnBYnBy5cRTcfVGqDmuk4xaAE6UAZeu+KdI8MW/n6rqVtYR4yPPkClvoOp/CuatiaOHXNVmo+p2YbB4jGS5cPTcn5L+rHiPjz9qe2gSS18K2puZen2+7UrGvuqdT/wLH0NfI43iOKTjhI3fd7fJf5n6HlnBdSbVTMJcq/lW/zey+V/VHzzrmu6h4k1KXUNUu5b28l+9LKcn6D0HsOK+HrVqmIm6lWV2z9Vw2Fo4SkqNCKjFdEUKyOsKACgAoAKACgAoAKAHwzyW0qywyNFIvIdGII+hFNScXdPUiUIzXLJXR1el/Fzxlo6BbbxHf7R0WeTzgP++816VPM8bS+Gq/nr+Z4dbIcsru86EfkrflY1/wDhoX4gYx/wkH/knb//ABuun+3Mw/5+fhH/ACOH/VXJ/wDnx/5NP/5IytS+MHjXVkK3HiS+CnqIHEOf++AK5qmaY2rpKq/lp+R2Ucgyug7woR+ev53OTuLma8laWeV55W5LyMWY/UmvNlJyd5O7PdhCNNcsFZeRHSNAoAKACgAoA//Z"
                alt="logo"
                style={{ borderRadius: '10%' }}
              />
              <h1>
                Yancey Blog Admin
              </h1>
            </a>
          </div>
          <div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <Link to="/">
                  <Icon type="dashboard" />
                  <span>
                  Overview
                  </span>
                </Link>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={(
                  <span>
                    <Icon type="home" />
                    <span>Home</span>
                  </span>
                )}
              >
                <Menu.Item key="2">
                  <Link to="/home/motto">
                    Motto
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/home/announcement">
                    Announcement
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/home/project">
                    Project
                  </Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to="/home/cover">
                    Cover
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={(
                  <span>
                    <Icon type="customer-service" />
                    <span>Music</span>
                  </span>
                )}
              >
                <Menu.Item key="6">
                  <Link to="/music/liveTour">
                    Live Tours
                  </Link>
                </Menu.Item>
                <Menu.Item key="7">
                  <Link to="/music/featuredRecord">
                    Featured Records
                  </Link>
                </Menu.Item>
                <Menu.Item key="8">
                  <Link to="/music/yanceyMusic">
                    Yancey Music
                  </Link>
                </Menu.Item>
                <Menu.Item key="10">
                  <Link to="/music/player">
                    Player
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="9">
                <Link to="/cv">
                  <Icon type="solution" />
                  <span>
                  CV
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="11">
                <Link to="/article/list">
                  <Icon type="file-text" />
                  <span>
                  Article
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="12">
                <Link to="/about">
                  <Icon type="team" />
                  <span>
                  About
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="13">
                <Link to="/setting/basic">
                  <Icon type="setting" />
                  <span>
                  Setting
                  </span>
                </Link>
              </Menu.Item>
            </Menu>
          </div>
        </Sider>
        <Layout>
          <Header style={{
            background: '#fff',
            padding: 0,
          }}
          >
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <div className="global_config">
              <span className="config_item">
                <Tooltip title="Official Document">
                  <a
                    href="https://github.com/Yancey-Blog/BLOG_BE/blob/master/README.md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon
                      type="question-circle"
                      theme="outlined"
                      style={{ position: 'relative', top: 4 }}
                    />
                  </a>
                </Tooltip>
              </span>
              <span className="config_item">
                <UserDrop />
              </span>
            </div>
          </Header>
          <Content>
            <Switch>
              <Route path="/" exact component={OverView} />
              <Route path="/home/motto" component={Motto} />
              <Route path="/home/announcement" component={Announcement} />
              <Route path="/home/project" component={Project} />
              <Route path="/home/cover" component={Cover} />
              <Route path="/music/liveTour" component={LiveTour} />
              <Route path="/music/featuredRecord" component={FeaturedRecord} />
              <Route path="/music/yanceyMusic" component={YanceyMusic} />
              <Route path="/music/player" component={Player} />
              <Route path="/cv" component={CV} />
              <Route path="/article/list" component={Article} />
              <Route path="/article/add" component={ArticleDetail} />
              <Route path="/article/update/:id" component={ArticleDetail} />
              <Route path="/about" component={About} />
              <Route path="/setting" component={Setting} />
              <Route path="/exception" component={Exception} />
              <Route component={Exception} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Copyright &copy;
            {' '}
            {new Date().getFullYear()}
            {' '}
            Yancey Inc. All rights reserved.
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Layouts;
