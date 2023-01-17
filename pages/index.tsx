/* eslint-disable react/no-children-prop */
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Card, Layout, List, Pagination, PaginationProps } from 'antd'
import { InfoCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Page404 from './404'
import ParticleNetwork from '../components/ParticleNetwork'


const { Header, Content } = Layout;

interface PassageInfo {
  title: string
  description: string
  pid: number
}
let pItemJson: PassageInfo[][] = [[]];
let othItemJson: PassageInfo[][] = [[]];
const Home = () => {
  const [psgList, setPsgList] = useState<PassageInfo[]>([]);
  const [othList, setOthList] = useState<PassageInfo[]>([]);
  const [showTitie, setShowTitle] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [forDefault, setForDefault] = useState(1);
  const [forDefault_, setForDefault_] = useState(1);
  const dataLength = useRef(0)
  const otherLength = useRef(0)
  const [title, setTitle] = useState('');
  const router = useRouter()

  const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const otherClick = () => {
    setShowTitle(true);
    setShowHistory(true);
    setTitle('Other');
  }

  const HomeClick = () => {
    setShowTitle(false);
    setShowHistory(false);
    router.push('/')
  }

  const synTitle = () => {
    if (!pItemJson) return;
    const q = router.asPath.indexOf('pid') === -1 ? undefined : router.asPath.substring(6);
    if (q) {
      let at: string;
      const queryId = parseInt(q);
      if (queryId > 1000)
        for (let i = 0; i < othItemJson.length; i++) {
          console.log(othItemJson)
          const e = othItemJson[i];
          if (at = e.find((e: PassageInfo) => e.pid === queryId).title) break;
        }
      else
        for (let i = 0; i < pItemJson.length; i++) {
          const e = pItemJson[i];
          if (at = e.find((e: PassageInfo) => e.pid === queryId).title) break;
        }
      if (at) {
        setTitle(at)
        setShowTitle(true);
      }
    }
  }

  const fetchData = () => {
    fetch('/blog/psgLst.json').then(res => res.json()).then((body) => {
      pItemJson = body.content
      dataLength.current = body.total
      setPsgList(pItemJson[0])
    }).then(() => {
      fetch('/othLst.json').then(res => res.json()).then((body) => {
        othItemJson = body.content
        otherLength.current = body.total
        setOthList(othItemJson[0])
        synTitle();
      })
    })
  }

  const reinFlag = useRef(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (reinFlag) fetchData(); else reinFlag.current = true }, []);

  const titleBox = <span style={{ marginLeft: 10 }}>{title}</span>

  const onChange: PaginationProps['onChange'] = (page) => {
    setPsgList([])
    setTimeout(() => setPsgList(pItemJson[page - 1]), 0);
    setForDefault(page)
  }

  const onChange_: PaginationProps['onChange'] = (page) => {
    setOthList([])
    setTimeout(() => setOthList(othItemJson[page - 1]), 200);
    setForDefault_(page)
  }

  const LoadingComponent =
    <div style={{
      height: 'calc(100vh - 64px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        width: 50,
        height: 50,
        borderRadius: 5,
        background: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
      }}>
        {loadingIcon}
      </div>
    </div>

  const PassageList = () =>
    <div id='psgList' style={{
      paddingTop: 25,
      paddingBottom: 35,
      overflowY: 'auto',
      overflowX: 'hidden',
      height: 'calc(100vh - 64px)'
    }}>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={psgList}
        renderItem={(item) => (
          <List.Item style={{
            display: 'flex',
            justifyContent: 'center'
          }}
          >
            <Card
              title={item.title}
              className={styles.cardItem}
              hoverable={true}
              onClick={() => {
                router.push(`/?pid=${item.pid}`)
                setTitle(item.title)
                setShowTitle(true)
              }}
            >
              {item.description}
            </Card>
          </List.Item>
        )}
      />
      <Pagination showQuickJumper defaultCurrent={forDefault} total={dataLength.current} onChange={onChange}
        style={{ display: 'flex', justifyContent: 'center', marginTop: 25 }} />
    </div>


  const HistoryList =
    <div id='hisList' style={{
      paddingTop: 25,
      paddingLeft: 25,
      paddingRight: 25,
      paddingBottom: 25,
      overflow: 'auto',
      height: 'calc(100vh - 64px)'
    }}>
      <List
        grid={{ gutter: 10, xxl: 4, xl: 4, lg: 4, md: 3, sm: 2, xs: 1 }}
        dataSource={othList}
        renderItem={(item) => (
          <List.Item style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Card
              title={item.title}
              style={{
                marginTop: 10,
                width: '100%'
              }}
              onClick={() => {
                router.push(`/?pid=${item.pid}`)
                setTitle(item.title)
                setShowTitle(true)
                setShowHistory(false)
              }}
              hoverable={true}
            >
              {item.description}
            </Card>
          </List.Item>
        )}
      />
      <Pagination defaultPageSize={16} showSizeChanger={false} defaultCurrent={forDefault_} total={otherLength.current} onChange={onChange_}
        style={{ display: 'flex', justifyContent: 'center', marginTop: 25 }} />
    </div>
  const MainLogic = () => {
    let result: JSX.Element;
    const query = router.query.pid;
    if (showHistory)
      result = HistoryList
    else if (query) {
      const queryId = parseInt(router.query.pid.toString());
      if ((queryId <= dataLength.current && queryId >= 1)
        || (queryId >= 1001 && queryId <= otherLength.current+1000)) {
        const ImportPage = dynamic<JSX.Element>(
          import(`./passages/P${queryId}`), {
          loading: () => LoadingComponent
        })
        result = <ImportPage key={''} type={undefined} props={undefined} />
      }
      else {
        if (dataLength.current === 0) return result;
        result = <Page404 />
      }
    }
    else {
      result = < PassageList />
    }
    return result;
  }

  return (
    <>
      <Head>
        <title>Kiramei&apos;s Blog</title>
        <meta name="description" content="Kiramei's blog is here" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/blog/favicon.ico" />
      </Head>
      <main >
        <Layout>
          <Header className={styles.headerBox} >
            <Image alt='' className={styles.logo} src='/blog/top_.png' width={70} height={70}></Image>
            <div className={styles.logoText}>
              <div className={styles.headerText} onClick={HomeClick}>Kiramei&apos;s Blog</div>
            </div>
            {showTitie ? <div className={styles.logoText} id='titleText'>
              <div className={styles.headerText}>{'> '}{titleBox}</div> </div> : <></>}
            <div className={styles.history} onClick={otherClick} >
              <div className={styles.headerText}>
                <InfoCircleOutlined />
              </div>
            </div>
          </Header>
          <Content >
            <ParticleNetwork id="ptn" />
            <MainLogic />
          </Content>
        </Layout>
      </main>
    </>
  )
}

export default Home;