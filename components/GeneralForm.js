import { Layout, 
    Card, 
    FormLayout, 
    Page, 
    TextField
} from '@shopify/polaris';


class GeneralForm extends React.Component {
    constructor(props) { 
        super(props)
        this.state = {...props}
    }

    state = { 
        resultsValue: 'options',
        resultsTitle: '',
        resultsParagraph: '',
        resultsTextAfter: '',
        introTitle: '',
        introParagraph: '',
        shareParagraph: ''
    };

    componentDidUpdate(nextProps){
        if (nextProps !== this.props ) this.setState({...nextProps})
    }

    render() {

        const {
            resultsTitle,
            resultsParagraph,
            resultsTextAfter,
            introTitle,
            introParagraph,
            shareParagraph,
            title, 
            intro
        } = this.state;

    return (
    <Page
        title="Settings"
        primaryAction={{
            content: this.props.isSaving ? 'Saving...' : 'Save',
            onAction: () => this.props.save(this.state),
    }}>
    <Layout>
        <Layout.AnnotatedSection
            title="General Settings"
            description="Tell us more about your quiz."
                >
                    {/* <DomainDisplay
                        handleChange={this.handleChange}
                        saveDomain={this.saveDomain}
                        domain ={this.state.domain} /> */}
            <Card sectioned>
            <FormLayout>
                <TextField 
                    label="Title"
                    value={title}
                    onChange={this.handleChange('title')} />
                <TextField 
                    label="Intro" 
                    value={intro}
                    multiline 
                    onChange={this.handleChange('intro')} />
            </FormLayout>
            </Card>
        </Layout.AnnotatedSection>

        <Layout.AnnotatedSection
            title="First Slide"
            description="The first slide your customers will see."
        >
            <Card sectioned>
            <FormLayout>
                <TextField 
                    label="Title"
                    value={introTitle}
                    onChange={this.handleChange('introTitle')} />
                <TextField 
                    label="Paragraph" 
                    value={introParagraph}
                    multiline 
                    onChange={this.handleChange('introParagraph')} />
            </FormLayout>
            </Card>
        </Layout.AnnotatedSection>

        <Layout.AnnotatedSection
            title="Share Page"
            description="The paragraph inviting people to share their email."
        >
            <Card sectioned>
            <FormLayout>
                <TextField 
                    label="Text"
                    value={shareParagraph}
                    multiline 
                    onChange={this.handleChange('shareParagraph')} />
            </FormLayout>
            </Card>
        </Layout.AnnotatedSection>

        <Layout.AnnotatedSection
            title="Results Page"
            description="Customize the last page of your quiz"
        >
            <Card sectioned>
            <FormLayout>
                <TextField 
                    label="Title" 
                    value={resultsTitle} 
                    onChange={this.handleChange('resultsTitle')} />
                <TextField 
                    label="Paragraph" 
                    value={resultsParagraph && resultsParagraph.replace(/<br\s*[\/]?>/gi, '\n')}
                    multiline 
                    onChange={this.handleChange('resultsParagraph')} />
                <TextField 
                    label="Text after the results" 
                    value={resultsTextAfter}
                    multiline 
                    onChange={this.handleChange('resultsTextAfter')} />
            </FormLayout>
            </Card>
        </Layout.AnnotatedSection>
    </Layout>
    </Page>
  )};

    handleResultsChange = (checked, value) => {
        this.setState({resultsValue: value});
    };
    
    saveDomain = (domain) => { 
        this.setState({ domain })
    }

    handleCheckChange = (field) => {
        return (value) => {
            this.setState({ [field]: value }
            )
        };
      };

    handleChange = (field) => {
        return (value) => {
            var formattedString = value.replace(/(?:\r\n|\r|\n)/g, '<br/>');
            this.setState({ [field]: formattedString }
            )
        };
      };
}

export default GeneralForm;