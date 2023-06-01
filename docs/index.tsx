import { Bold, Break, CodeBlock, H1, Image, List, render } from 'jsx-to-md'
import { initI18n } from 'i18n-pro'
import en from './i18n/en.json'

export default function MarkDown(props: any) {
  const { t } = initI18n({
    namespace: props.locale,
    locale: props.locale,
    langs: {
      en,
    },
  })

  return (
    <>
      <H1>{t('概述')}</H1>
      {t(
        '这是一个{0}应用在{1}上的一个简单示例，由于当前库是一个纯{2}的库，没有任务其他框架或库的逻辑有关联，因此在其他的UI库（例如{3}）使用方式没有不同',
        ' `i18n-pro` ',
        ' `React` ',
        ' `JavaScript` ',
        ' `Vue` ',
      )}
      <H1>{t('特别说明')}</H1>
      {t(
        '如果要正常体验模拟服务端响应的话，下图红色部分，需要确保正常已开启了两个服务',
      )}
      <Image
        alt={t('示例图片')}
        src="https://s3.bmp.ovh/imgs/2023/06/01/9454bc713e431739.png"
      />
      {t('两个服务分别是：')}
      <List
        items={[
          'O',
          t('前端页面的服务（端口：5173），用于展示示例'),
          t('后端接口服务（端口：8080），用于接收并相应点击按钮的请求'),
        ]}
      />
      <Break />
      <Break />
      {t(
        '如果当前是通过{0}打开的，两个服务默认可以正常启动，可以在这个位置看到已打开的服务列表',
        ' `CodeSandBox` ',
      )}
      <Image
        alt={t('示例图片')}
        src="https://s3.bmp.ovh/imgs/2023/06/01/4f1545b5d2dd01e9.png"
      />
      <Break />
      <Break />
      {t(
        '如果是通过{0}打开的，默认只能一个终端启动一个服务，但是可以新建一个终端，来启动另一个服务，默认启动是{1}',
        ' `StackBlitz` ',
        render(<Bold>{t('前端页面的服务（端口：5173）')}</Bold>),
      )}
      <Break />
      <Break />
      {t('添加终端操作如下：')}
      <Image
        alt={t('示例图片')}
        src="https://s3.bmp.ovh/imgs/2023/06/01/309bee8bb93b8ff9.png"
      />
      {t(
        '在新终端输入如下命令来启动{0}',
        render(<Bold>{t('后端接口服务（端口：8080）')}</Bold>),
      )}
      <CodeBlock langType="bash" code={`npm run server`} />
      {t('效果如下：')}
      <Image
        alt={t('示例图片')}
        src="https://s3.bmp.ovh/imgs/2023/06/02/4e7d3f425b3e6ff0.png"
      />
    </>
  )
}
