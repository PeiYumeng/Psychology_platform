import React from 'react';
import './Footer.css';
import { Avatar} from 'antd';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          订阅Psychole，了解最新活动！
        </p>
        <p className='footer-subscription-text'>
          您可以随时取消订阅
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='您的邮箱'
            />
            <Button buttonStyle='btn--outline'>订阅</Button>
          </form>
        </div>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>关于我们</h2>
            <Link to='/'>功能介绍</Link>
            <Link to='/'>大咖寄语</Link>
            <Link to='/'>职业发展</Link>
            <Link to='/'>投资融资</Link>
            <Link to='/'>服务条款</Link>
          </div>
          <div class='footer-link-items'>
            <h2>联系我们</h2>
            <Link to='/'>联系方式</Link>
            <Link to='/'>支持方式</Link>
            <Link to='/'>公司分布</Link>
            <Link to='/'>赞助名单</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>加入我们</h2>
            <Link to='/'>上传资质</Link>
            <Link to='/'>宣传大使</Link>
            <Link to='/'>中介机制</Link>
            <Link to='/'>灵感提供</Link>
          </div>
          <div class='footer-link-items'>
            <h2>社交媒体</h2>
            <Link to='/'>新浪微博</Link>
            <Link to='/'>今日头条</Link>
            <Link to='/'>哔哩哔哩</Link>
            <Link to='/'>领英中国</Link>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              <Avatar size={{xs: 50, sm: 50, md: 50, lg: 50, xl: 50}} shape="circle" style={{borderRadius:'5%'}} src={logo} />
              &nbsp;Psychole
            </Link>
          </div>
          <small class='website-rights'>Psychole © 2021</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='/'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='/'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;